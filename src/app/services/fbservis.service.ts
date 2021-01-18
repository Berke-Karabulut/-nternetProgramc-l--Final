import { Urun } from './../models/urun';
import { AngularFireStorage } from '@angular/fire/storage';
import { Kategori } from './../models/kategori';

import { Uye } from './../models/uye';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { Key } from 'protractor';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {

  private dbUye = '/Uyeler';
  private dbUrun = '/Urunler';
  private dbKategori = '/Kategoriler';
  basePath = "/Urunler";
   
  uyeRef: AngularFireList<Uye> = null;
  urunRef: AngularFireList<Urun> = null;
  KategoriRef: AngularFireList<Kategori> = null;
  
  constructor(
  
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth,
  public storage: AngularFireStorage
  
  )
  
  {
  
  this.uyeRef = db.list(this.dbUye);
  this.urunRef = db.list(this.dbUrun);
  this.KategoriRef = db.list(this.dbKategori)

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
 

  /* Ürün Servisleri Başlangıç */
  
UrunListele(){
  return this.urunRef;
}
UrunByKey(key:string){
  return this.db.object("/Urunler/" + key)
}
UrunListeleByUID(uid: string) {
  return this.db.list("/Urunler", q => q.orderByChild("uid").equalTo(uid));
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

/* Firabase Kategori Başlangıç */

KategoriListele(){
  return this.KategoriRef;
}

KategoriByKey(key:string){
  return this.db.object("/Kategoriler/" + key)
}

KategoriEkle(kat : Kategori){
return this.KategoriRef.push(kat)
}
KategoriDuzenle(kategori: Kategori) {
  return this.KategoriRef.update(kategori.key, kategori);
}

KategoriSil(key: string){
  return this.KategoriRef.remove(key);
}

}