import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  
  name;
items = [];





  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
       this.UpdateData();
    }
    UpdateData(){
      this.items = [];
      firebase.database().ref('/Shopper/').on("value", (snapshot) =>{
        snapshot.forEach((snap) =>{
          this.items.push({key : snap.key, name:snap.val()});

          return false;
        })
      })
    }
    add(){
      this.items = [];
      console.log(this.name);
      var database = firebase.database();
      database.ref('/Shopper/').push(this.name);
      this.UpdateData();
      console.log(this.items);
    }
    delete(key){
      var database = firebase.database();
      database.ref('/Shopper/' +key).remove();
      this.UpdateData();
    }
    update(key){
      this.name = "Shopped"
      this.name = '';
      var database = firebase.database();
      database.ref('/Shopper/' +key).set(this.name);
      this.UpdateData();
    }

}
