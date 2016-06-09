import {Page, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/task-detail/task-detail.html',
})
export class TaskDetailPage {
  private title: String;
  private description: String;

  constructor(public navParams: NavParams) {
    this.navParams = navParams;

    this.title = this.navParams.get('task').title;
    this.description = this.navParams.get('task').description;
  }
}
