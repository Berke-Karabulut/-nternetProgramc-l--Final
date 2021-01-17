import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from'rxjs/operators';
import { Urun } from './../../models/urun';
import { Sonuc } from './../../models/sonuc';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urunler: any;
  secUrun: Urun = new Urun();
  sonuc: Sonuc = new Sonuc()
  urunSonuc: Sonuc = new Sonuc();
  silme: boolean = false;
  onaylama: boolean = false;
  uid:string;
  adsoyad:string;

  constructor(
    public fbservis: FbservisService,
    public router : Router,
    public toast: ToastrService
  ) { }
  

  ngOnInit(): void {
    this.UrunListele();
  }

  ToastUygula(){
    this.toast.success("Siparişiniz Alınmıştır.")
    this.sonuc.islem = true;
    this.sonuc.mesaj = "Sipariş alındı"
    this.onaylama = false;
  }

  UrunListele() {
    this.fbservis.UrunListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.urunler = data;
    });
  }

  UrunSec(u: Urun){
    Object.assign(this.secUrun, u)
  }

  SepeteEkle() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.secUrun.uid = user.uid;
  
    var tarih = new Date();
    this.secUrun.kayTarih = tarih.getTime().toString();
    this.secUrun.duzTarih = tarih.getTime().toString();
    this.fbservis.UrunEkle(this.secUrun).then(d => {
      this.router.navigate(['/']);
    });
  }

  OturumKapat(){
this.fbservis.OturumKapat().then(d=>{
  localStorage.removeItem("user")
  this.router.navigate(['/'])
})
  }

}
