import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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
  snapshot: Observable<ShoppingItem[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore,
              private actionSheetCtrl: ActionSheetController) {
    this.shoppingItemsCollection = this.afs.collection("shopping-list");
    this.shoppingList = this.shoppingItemsCollection.valueChanges();
    this.snapshot = this.shoppingItemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as ShoppingItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad shopping-listPage');
  }*/

  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            console.log("Editando");
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.shoppingItemsCollection.doc(shoppingItem.itemId).delete().then(function() {
              console.log("Eliminando");
            }).catch(function(error) {
              console.log("error");
            });            
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelando");
          }
        }
      ] 
    }).present();
  }

  ToAddShoppingItem() {
    this.navCtrl.push(AddShoppingItemPage);
  }

}
