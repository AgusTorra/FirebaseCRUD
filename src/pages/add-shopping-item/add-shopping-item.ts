import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ShoppingListPage } from '../shopping-list/shopping-list';

@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemsCollection: AngularFirestoreCollection<ShoppingItem>;
  shoppingList: Observable<ShoppingItem[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore) {
    this.shoppingItemsCollection = this.afs.collection('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    this.shoppingItemsCollection.add({
      itemName: shoppingItem.itemName,
      itemNumber: Number(shoppingItem.itemNumber),
    });
    this.shoppingItem = {} as ShoppingItem;
    this.navCtrl.pop();
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }*/

}
