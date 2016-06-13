import {Alert, Page, NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../providers/data/data';
import {RemoveItemsPage} from '../remove-items/remove-items';

@Page({
  templateUrl: 'build/pages/edit-task/edit-task.html',
})
export class EditTaskPage {
  private title: any;
  private description: any;
  private id: Number;
  private newDescription: String;

  constructor(public nav: NavController, public navParams: NavParams, private dataService: DataService) {
    this.navParams = navParams;
    this.title = this.navParams.get('task').title;
    this.description = this.navParams.get('task').description;
    this.id = this.navParams.get('task').id;
    this.dataService = dataService;
    this.newDescription = '';
  }

  /**
   * save updated task to the data
   * @return {[type]} [description]
   */
  saveTask() {
    this.dataService.update({
      id: this.id,
      description: this.description,
      title: this.title
    });

    this.nav.pop()
  }

/**
 * add item to existing list;
 * @return {[type]} [description]
 */
  addItem() {
    this.description.push({
      checked: false,
      description: this.newDescription
    });

    this.newDescription = '';
  }

  confirmItemRemoval(item) {
    let alert = Alert.create({
      title: 'Confirm removal',
      message: 'Do you want to remove this item?',
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
            // this.removeItem(item);
          }
        }
      ]
    });

    this.nav.present(alert);
  }

  /**
   * Navigate to remove items page;
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  removeItems(item) {
    this.nav.push(RemoveItemsPage, {
      task: this.navParams.get('task')
    })
  }

}
