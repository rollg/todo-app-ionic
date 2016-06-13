import {Page, NavController, NavParams} from 'ionic-angular';
import {EditTaskPage} from '../edit-task/edit-task';

@Page({
  templateUrl: 'build/pages/remove-items/remove-items.html',
})
export class RemoveItemsPage {
  private items: any;
  private title: String;
  private id: Number;

  constructor(public nav: NavController, public navParams: NavParams) {

    this.title = this.navParams.get('task').title;
    this.items = this.navParams.get('task').description;
    this.id = this.navParams.get('task').id;
  }

  /**
   * remove selected elements from the array;
   * @return {[type]} [description]
   */
  removeSelected() {
    var arrayOfElementsToBeRemoved = [];

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].checked === true) {
        arrayOfElementsToBeRemoved.push(this.items[i]);
      }
    }

    //Remove all the checked elements;
    this.items = this.items.filter(function(item) {
      return arrayOfElementsToBeRemoved.indexOf(item) === -1;
    });
  }

  /**
   * save current changes;
   * @return {[type]} [description]
   */
  save() {
    /*
    TODO:navigation has to be improved;
     */
    this.nav.push(EditTaskPage, {
      task: {
        title: this.title,
        id: this.id,
        description: this.items
      }
    });
  }
}
