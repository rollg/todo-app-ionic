import {Page, NavController} from 'ionic-angular';
import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from "../item-detail/item-detail";
import {DataService} from "../../providers/data/data";

@Page({
    templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
    public items: Array;
    public nav: NavController;
    public dataService;

    constructor(nav: NavController, dataService: DataService) {

        this.nav = nav;
        this.dataService = dataService;

        this.items = [];

        this.dataService.getData().then((todos) => {
            this.items = JSON.parse(todos) || [];
        })
    }

    addItem() {
        this.nav.push(AddItemPage, {ListPage: this});
    }

    saveItem(item) {
        this.items.push(item);
        this.dataService.save(item);
    }

    viewItem(item) {
        this.nav.push(ItemDetailPage, {
            item: item
        });
    }

    /**
     * Remove Item from the list of items
     * @param item {id: Number, title: String, description: String}
     * @param slidingItem
     */
    removeItem(item: {id: Number, title: String, description: String}, slidingItem) {
        slidingItem.close();
        //this.items.find(function(currentItem) { return currentItem.id === item.id; });
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] == item) {
                this.items.splice(i, 1);
                this.dataService.remove(item);
            }
        }
    }

    editItem(item) {
        this.nav.push(ItemDetailPage, {
            item: item
        });
    }
}
