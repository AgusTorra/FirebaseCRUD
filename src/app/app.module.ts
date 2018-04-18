import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { AddShoppingItemPage } from '../pages/add-shopping-item/add-shopping-item';
import { EditShoppingListPage } from '../pages/edit-shopping-list/edit-shopping-list';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore'
import { enviroment } from '../enviroments/enviroment';
import { ToastService } from '../services/toast-service';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddShoppingItemPage,
    EditShoppingListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(enviroment),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingItemPage,
    EditShoppingListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastService,
    AngularFirestore,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
