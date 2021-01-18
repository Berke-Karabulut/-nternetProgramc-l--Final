import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Dosya } from './../models/dosya';

@Injectable({
  providedIn: 'root'
})
export class StorageServisService {
  private basePath = "/Urunler";

constructor(
  public db: AngularFireDatabase,
  public storage: AngularFireStorage
  
) { }

DosyaYukleStorage(dosya: Dosya, urunAdi: string, urunaciklama: string, urunKatAdi: string,
  urunfiyati: number,  
  ) {
  var tarih = new Date();

  const dosyaYol = this.basePath + "/" + dosya.file.name;
  const storageRef = this.storage.ref(dosyaYol);
  const yukleTask = this.storage.upload(dosyaYol, dosya.file);
  dosya.urunAdi = urunAdi;
  dosya.urunaciklama = urunaciklama;
  dosya.urunKatAdi = urunKatAdi;
  dosya.urunfiyati = urunfiyati;
  dosya.kayTarih = tarih.getTime().toString();
  yukleTask.snapshotChanges().pipe(

    finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadUrl => {
        dosya.url = downloadUrl;
        dosya.adi = dosya.file.name;
        this.DosyaVerileriKaydet(dosya);
      })
    })
  ).subscribe();

  return yukleTask.percentageChanges();

}

DosyaVerileriKaydet(dosya: Dosya) {
  this.db.list(this.basePath).push(dosya);

}
DosyaListele() {
  return this.db.list(this.basePath);
}


DosyaSil(dosya: Dosya) {
  this.DosyaVeriSil(dosya).then(() => {
    this.StorageSil(dosya);
  });
}

DosyaVeriSil(dosya: Dosya) {
  return this.db.list(this.basePath).remove(dosya.key);
}

StorageSil(dosya: Dosya) {
  const storageRef = this.storage.ref(this.basePath);
  storageRef.child(dosya.adi).delete();
}
}


