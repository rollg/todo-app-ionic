import {Page, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/item-detail/item-detail.html',
})
export class ItemDetailPage {
  private title: String;
  private description: String;

  constructor(public navParams: NavParams) {
    this.navParams = navParams;

    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
  }
}
