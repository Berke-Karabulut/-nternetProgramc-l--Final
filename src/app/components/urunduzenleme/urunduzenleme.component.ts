import { Urun } from './../../models/urun';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-urunduzenleme',
  templateUrl: './urunduzenleme.component.html',
  styleUrls: ['./urunduzenleme.component.css']
})
export class UrunduzenlemeComponent implements OnInit {
  key: string;
  secUrun: Urun = new Urun();
  uid: string;

  constructor(
    public route: ActivatedRoute,
    public fbServis: FbservisService,
    public router: Router
    
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p =>{
      this.key = p.key;
      this.UrunGetir();
    });
  }

  UrunGetir(){
    this.fbServis.UrunByKey(this.key).snapshotChanges().subscribe(d =>{
      const k = { ...d.payload.toJSON(),  key: this.key };
      this.secUrun = (k as Urun);
    })
  }

  Kaydet(){
    var tarih = new Date(); 
    this.secUrun.duzTarih = tarih.getTime().toString();
    this.fbServis.UrunDuzenle(this.secUrun).then(d =>{
      this.router.navigate(['/admin'])
    })
  }

}
