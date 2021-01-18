import { StorageServisService } from './../../services/storageServis.service';
import { KateklesilComponent } from './../kateklesil/kateklesil.component';
import { Key } from 'protractor';
import { Kategori } from './../../models/kategori';
import { Urun } from './../../models/urun';
import { Dosya } from './../../models/dosya';
import { FbservisService } from './../../services/fbservis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  urunler: any;
  urunler2: Urun[]
  kategoriler: Kategori[];
  secKat: Kategori = new Kategori();

  secUrun: Urun = new Urun();
  sonuc: Sonuc = new Sonuc();
  katSonuc: Sonuc = new Sonuc();
  urunSonuc: Sonuc = new Sonuc();
  silme: boolean = false;
  files: FileList;
  admin: string;
  adminsonuc: boolean;

  constructor(
    public storageServis: StorageServisService,
    public toast: ToastrService,
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.UrunListele();
    this.KategoriListele();

    var user: any = JSON.parse(localStorage.getItem("user"));
    this.admin = user.uid;
    
    this.secUrun.key == null;
    this.AdminKontrol();
  }

  AdminKontrol() {
    if (this.admin != "SKqXUccqDeQLxJQqn5T4L9EdEm32") {
      this.router.navigate(['/']);
    }

  }

  ToastrUygula(){
    this.toast.success("Ürün Eklendi.")
  }
 /* Storage Resim Yüklemek için */
 DosyaSec(e) {
  this.files = e.target.files;
}
DosyaYukle() {
  var file = this.files[0];
  var dosya = new Dosya();
  dosya.file = file;
  this.storageServis.DosyaYukleStorage(dosya, this.secUrun.urunAdi, this.secUrun.urunaciklama, this.secUrun.urunKatAdi,
    this.secUrun.urunfiyati,).subscribe(p => {
      console.log("Yüklendi");
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ürün Eklendi";

    }, err => {
      console.log("Problemler var.");
    });
}

dosyaListele() {
  this.storageServis.DosyaListele().snapshotChanges().subscribe(data => {
    this.urunler = [];
    data.forEach(satir => {
      var y = { ...satir.payload.toJSON(), key: satir.key };
      this.urunler.push(y as Dosya)
    })
  });
}

DosyaSil(dosya: Dosya) {
  this.storageServis.DosyaSil(dosya);
}

  /* Kategori */

  KategoriListele(){
    this.fbServis.KategoriListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kategoriler = data;
    });
  }

  KategoriSec(k: Kategori){
    Object.assign(this.secKat, k)
  }

  /* Ürün */

  UrunListele() {
    this.fbServis.UrunListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.urunler = data;
    });
  }
  Kaydet(){
    var tarih = new Date();
    
    if (this.secUrun.key == null) {
      
      ;
    } else {
      this.secUrun.duzTarih = tarih.getTime().toString();
      this.secUrun.islem = false;
      this.fbServis.UrunDuzenle(this.secUrun).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = " Ürün Güncellendi.";
      });
    }
    
  }

  UrunSec(u: Urun){
    Object.assign(this.secUrun, u)
  }

  Sil(){
    this.fbServis.urunSil(this.secUrun.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ürün Silindi"
      this.silme = false;
    });
    
    }
}

