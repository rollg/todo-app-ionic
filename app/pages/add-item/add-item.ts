import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/add-item/add-item.html',
})
export class AddItemPage {
  private title: String;
  private description: String;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.navParams = navParams;

    this.title = "";
    this.description = "";
  }

  /**
   * save item to the list of items, with unique id
   */
  saveItem() {
    let newItem = {
      id: new Date().getTime(),
      title: this.title,
      description: this.description
    };

    this.navParams.get('ListPage').saveItem(newItem);
    this.nav.pop();
  }
}
