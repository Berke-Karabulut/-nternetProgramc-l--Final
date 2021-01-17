import { Router } from '@angular/router';
import { FbservisService } from './../../services/fbservis.service';
import { Kategori } from './../../models/kategori';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from './../../models/sonuc';
import { map } from'rxjs/operators';


@Component({
  selector: 'app-kateklesil',
  templateUrl: './kateklesil.component.html',
  styleUrls: ['./kateklesil.component.css']
})
export class KateklesilComponent implements OnInit {
  kategoriler : Kategori[];
  secKat: Kategori = new Kategori();
  sonuc: Sonuc = new Sonuc();
  katSonuc: Sonuc = new Sonuc();
  silme: boolean = false;

  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
   this.KategoriListele();
  }
  
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

  KategoriKaydet(){
    var tarih = new Date();
    if (this.secKat.key == null) {
      this.secKat.islem = false;
      this.fbServis.KategoriEkle(this.secKat).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kategori Eklendi.";
      });
    } else {
      this.secKat.islem = false;
      this.fbServis.KategoriDuzenle(this.secKat).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = " KategoriGüncellendi.";
      });
    }
  }

  KategoriSill(){
    this.fbServis.KategoriSil(this.secKat.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kategori Silindi"
      this.silme = false;
    });
  }

  KategoriSec(k: Kategori){
    Object.assign(this.secKat, k)
  }
 

}
