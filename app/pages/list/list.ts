import {Alert, Page, NavController} from 'ionic-angular';
import {AddTaskPage} from '../add-task/add-task';
import {TaskDetailPage} from "../task-detail/task-detail";
import {DataService} from "../../providers/data/data";
import {EditTaskPage} from "../edit-task/edit-task";

@Page({
    templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
    public tasks: any;
    public nav: NavController;
    public dataService;

    constructor(nav: NavController, dataService: DataService) {

        this.nav = nav;
        this.dataService = dataService;

        this.tasks = [];

        this.dataService.getData().then((todos) => {
            this.tasks = JSON.parse(todos) || [];
        })
    }

    /**
     * Navigate to add task page;
     */
    addTask() {
        this.nav.push(AddTaskPage, {ListPage: this});
    }

    confirmRemoval(task, slidingItem) {
      let alert = Alert.create({
        title: 'Confirm removal',
        message: 'Do you want to remove this task?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.removeTask(task, slidingItem);
            }
          }
        ]
      });

      this.nav.present(alert);
    }

    /**
     * add (push) item to the tasks list and pass it to the dataService.save() method;
     * @param item
     */
    saveTask(item) {
        this.tasks.push(item);
        this.dataService.save(item);
    }

    /**
     * View task description;
     * @param task
     */
    viewTask(task) {
        this.nav.push(TaskDetailPage, {
            task: task
        });
    }

    /**
     * Remove Item from the list of tasks
     * @param item {id: Number, title: String, description: String}
     * @param slidingItem
     */
    removeTask(item: {id: Number, title: String, description: String}, slidingItem) {
        slidingItem.close();
        //this.tasks.find(function(currentItem) { return currentItem.id === item.id; });
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i] == item) {
                this.tasks.splice(i, 1);
                this.dataService.remove(item);
            }
        }
    }

    /**
     * navigate to Edit page for editing;
     * @param item
     */
    editTask(task) {
        this.nav.push(EditTaskPage, {
            task: task
        });
    }
}
