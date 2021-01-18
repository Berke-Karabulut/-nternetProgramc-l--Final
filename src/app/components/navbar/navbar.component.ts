import { Router } from '@angular/router';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  admin: string;
  adminsonuc: boolean;

  constructor(
    public fbservis: FbservisService,
    public router : Router
  ) { }

  ngOnInit() {
   
  }


  OturumKapat(){
    this.fbservis.OturumKapat().then(d=>{
      localStorage.removeItem("user")
      this.router.navigate(['/'])
    })
      }

}
