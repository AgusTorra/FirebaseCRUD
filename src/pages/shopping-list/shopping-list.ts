import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { EditShoppingListPage } from '../edit-shopping-list/edit-shopping-list';
import { AddShoppingItemPage } from "../add-shopping-item/add-shopping-item";
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingItemsCollection: AngularFirestoreCollection<ShoppingItem>;
  shoppingList: Observable<ShoppingItem[]>;
  snapshot: Observable<ShoppingItem[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore,
              private actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public tsv: ToastService) {
    this.shoppingItemsCollection = this.afs.collection('shopping-list', ref => {
        return ref.where('itemNumber', '>', 0);
    });    
    this.shoppingList = this.shoppingItemsCollection.valueChanges();
    this.snapshot = this.shoppingItemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as ShoppingItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: shoppingItem.itemName,
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.navCtrl.push(EditShoppingListPage, shoppingItem);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.shoppingItemsCollection.doc(shoppingItem.itemId).delete().then();
            this.tsv.presentToast("Producto " + shoppingItem.itemName + " eliminado!");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ] 
    }).present();
  }
  
  ToAddShoppingItem() {
    this.navCtrl.push(AddShoppingItemPage);
  }

}
