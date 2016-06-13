import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/add-task/add-task.html',
})
export class AddTaskPage {
  private title: String;
  private description: String;
  private items: any;
  private savedTitle: String;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.navParams = navParams;

    this.title = "";
    this.description = "";
    this.savedTitle = "";
    this.items = [];
  }

  /**
   * save item to the list of items, with unique id
   */
  saveTask() {
    if (this.title.length &&
        this.items.length) {

      let newTask = {
        id: new Date().getTime(),
        title: this.title,
        description: this.items
      };

      this.navParams.get('ListPage').saveTask(newTask);
      this.nav.pop();
    }
  }

  /**
   * Add new item to the task;
   */
  addItem(input) {
    this.savedTitle = this.title;
    this.items.push({ description: this.description, checked: false });
    this.description = '';

    this.focusInput(input);
  }

  /**
   * set focus on <input>
   * @param  {[type]} input [description]
   * @return {[type]}       [description]
   */
  focusInput(input) {
    input.setFocus();
  }
}
