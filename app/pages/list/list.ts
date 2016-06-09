import {Page, NavController} from 'ionic-angular';
import {AddTaskPage} from '../add-task/add-task';
import {TaskDetailPage} from "../task-detail/task-detail";
import {DataService} from "../../providers/data/data";

@Page({
    templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
    public tasks: Array;
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
    editTask(item) {
        this.nav.push(TaskDetailPage, {
            item: item
        });
    }
}
