/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppstorageService } from '../services/appstorage.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  year = new Date().getFullYear()
  member: any
  isLogged = false
  articles: any

  constructor(private appstorage: AppstorageService, private loadCtrl: LoadingController, private router: Router, private http: HttpClient) {}

  async ngOnInit(){
    
  }

  async ionViewWillEnter(){
    const load = await this.loadCtrl.create({
      duration: 2000,
      spinner: 'bubbles',
      message: 'Getting Information'
    })

    await load.present()
    
    this.appstorage.get('user_data').then(res => {
      if(res){
        this.member = res
        this.isLogged = this.member.length > 0 ? true : false
      }
      this.http.get('assets/vol.json').subscribe(res => {
        console.log(res);
        this.articles = res
      })
    }).then(async () => await load.dismiss())
  }

  openMenu(){
    const nav = document.querySelector('.nav-list')
    nav?.classList.toggle('open')
  }

  clear(){
    this.appstorage.clear().then(() => {
      window.location.reload()
    })
  }

}
