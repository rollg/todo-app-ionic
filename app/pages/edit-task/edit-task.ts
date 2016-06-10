import {Page, NavController, NavParams} from 'ionic-angular';
import {DataService} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/edit-task/edit-task.html',
})
export class EditTaskPage {
  private title: any;
  private description: any;
  private id: Number;

  constructor(public nav: NavController, public navParams: NavParams, private dataService: DataService) {
    this.navParams = navParams;
    this.title = this.navParams.get('task').title;
    this.description = this.navParams.get('task').description;
    this.id = this.navParams.get('task').id;
    this.dataService = dataService;
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
}
