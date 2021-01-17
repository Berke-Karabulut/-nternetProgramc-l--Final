import { KateklesilComponent } from './../kateklesil/kateklesil.component';
import { Key } from 'protractor';
import { Kategori } from './../../models/kategori';
import { Urun } from './../../models/urun';
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
  kategoriler: Kategori[];
  secKat: Kategori = new Kategori();

  secUrun: Urun = new Urun();
  sonuc: Sonuc = new Sonuc();
  katSonuc: Sonuc = new Sonuc();
  urunSonuc: Sonuc = new Sonuc();
  silme: boolean = false;
  files: FileList;

  constructor(
    public toast: ToastrService,
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.UrunListele();
    this.KategoriListele();
  }

  ToastrUygula(){
    this.toast.success("Ürün Eklendi.")
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
      this.secUrun.kayTarih = tarih.getTime().toString();
      this.secUrun.duzTarih = tarih.getTime().toString();
      
      this.secUrun.islem = false;
      this.fbServis.UrunEkle(this.secUrun).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ürününüz Eklendi.";
      });
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

