import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  public data: any = null;
  public storage: any;

  constructor() {

    this.storage = new Storage(SqlStorage, { name: 'todoapp' });
    this.data = null;

    this.storage.get('todoapp').then((todos) => {
      this.data = JSON.parse(todos);
    });
  }

  /**
   * Get all the data from the 'todoapp' database;
   * NOTE: returns promise;
   * @returns {any}
   */
  getData() {
    return this.storage.get('todoapp');
  }

  /**
   * Save item to the database,
   * @param item
   */
  save(item) {
    if (!this.data) {
      this.data = [item];
      let newData = JSON.stringify(item);
      this.storage.set('todoapp', newData);
    } else {
      this.data.push(item);
      let newData = JSON.stringify(this.data);
      this.storage.set('todoapp', newData);
    }
  }

  /**
   * Remove item from the database
   * @param item
   */
  remove(item: {id: Number, title: String, description: String}) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === item.id) {
        this.data.splice(i, 1);
        let newData = JSON.stringify(this.data);
        this.storage.set('todoapp', newData);
      }
    }
  }
}

