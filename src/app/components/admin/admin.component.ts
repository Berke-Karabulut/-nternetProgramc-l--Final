import { Urun } from './../../models/urun';
import { FbservisService } from './../../services/fbservis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from'rxjs/operators';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  urunler: any;
  secUrun: Urun = new Urun();
  sonuc: Sonuc = new Sonuc();
  katSonuc: Sonuc = new Sonuc();
  urunSonuc: Sonuc = new Sonuc();

  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.UrunListele();
  }
  
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
        this.sonuc.mesaj = "Kayıt Ürün Güncellendi.";
      });
    }
  }
}

