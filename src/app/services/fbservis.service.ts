
import { Uye } from './../models/uye';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Urun } from '../models/urun';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {

  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  private dbUrun = '/Urunler';

  uyeRef: AngularFireList<Uye> = null;
  urunRef: AngularFireList<Urun> = null;
  
  constructor(
  
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth
  
  )
  
  {
  
  this.uyeRef = db.list(this.dbUye);
  this.urunRef = db.list(this.dbUrun);

  }
  OturumKontrol(){
    if (localStorage.getItem("user")){
      return true;
    } else {
      return false;
    }
  }

  OturumAc(mail:string,parola:string){
    return this.afAuth.signInWithEmailAndPassword(mail,parola)

  }
  OturumKapat(){
    return this.afAuth.signOut();

  }
  
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }
  
UrunListele(){
  return this.urunRef;
}
UrunByKey(key:string){
  return this.db.object("/Urunler/" + key)
}
UrunEkle(urun: Urun) {
  return this.urunRef.push(urun);
}
UrunDuzenle(urun: Urun) {
  return this.urunRef.update(urun.key, urun);
}
urunSil(key: string) {
  return this.urunRef.remove(key);
}

}