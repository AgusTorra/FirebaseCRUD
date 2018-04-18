import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ShoppingListPage } from '../shopping-list/shopping-list';

@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {
  @ViewChild('focusInput') myInput ;
  shoppingItem = {} as ShoppingItem;

  shoppingItemsCollection: AngularFirestoreCollection<ShoppingItem>;
  shoppingList: Observable<ShoppingItem[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore,
              public toastCtrl: ToastController) {
    this.shoppingItemsCollection = this.afs.collection('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    const id = this.afs.createId();
    this.shoppingItemsCollection.doc(id).set({
      itemId: id,
      itemName: shoppingItem.itemName,
      itemNumber: Number(shoppingItem.itemNumber),
    })
    this.presentToast("Se agregó " + shoppingItem.itemName + " a la lista!", 3000, "bottom");
    this.shoppingItem = {} as ShoppingItem;
    this.navCtrl.pop();
  }

  presentToast(msg: string, time: number, pos: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: pos
    });
    toast.present();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.myInput.setFocus();
    },500);
 }

}
