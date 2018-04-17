import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddShoppingItemPage } from "../add-shopping-item/add-shopping-item";
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingItemsCollection: AngularFirestoreCollection<ShoppingItem>;
  shoppingList: Observable<ShoppingItem[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore) {
    this.shoppingItemsCollection = this.afs.collection('shopping-list');
    this.shoppingList = this.shoppingItemsCollection.valueChanges();
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad shopping-listPage');
  }*/

  ToAddShoppingItem() {
    this.navCtrl.push(AddShoppingItemPage);
  }

}
