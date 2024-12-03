/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AppstorageService } from '../services/appstorage.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-art-detail',
  templateUrl: './art-detail.page.html',
  styleUrls: ['./art-detail.page.scss'],
})
export class ArtDetailPage implements OnInit {

  year = new Date().getFullYear()
  member: any
  isLogged = false
  article: any

  constructor(private appstorage: AppstorageService, private loadCtrl: LoadingController, private router: Router, private route: ActivatedRoute) { }

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
    }).then(async () => await load.dismiss())
  }

  ngOnInit() {
    this.article = this.router.getCurrentNavigation()?.extras.state
    console.log(this.article);
    
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

  purchase(){
    
  }

}
