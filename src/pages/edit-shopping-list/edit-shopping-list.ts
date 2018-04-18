import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-edit-shopping-list',
  templateUrl: 'edit-shopping-list.html',
})
export class EditShoppingListPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemsCollection: AngularFirestoreCollection<ShoppingItem>;
  shoppingList: Observable<ShoppingItem[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore) {
    this.shoppingItem = navParams.data;
    this.shoppingItemsCollection = this.afs.collection('shopping-list');
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    this.shoppingItemsCollection.doc(shoppingItem.itemId).update({
      itemId: shoppingItem.itemId,
      itemName: shoppingItem.itemName,
      itemNumber: Number(shoppingItem.itemNumber),  
    });
    this.shoppingItem = {} as ShoppingItem;
    this.navCtrl.pop();
  }

}
