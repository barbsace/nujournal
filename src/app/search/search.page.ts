/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AppstorageService } from '../services/appstorage.service';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  member: any
  isLogged: any
  searchTerm: any
  searchBy: any = 'title'
  searchedArticles: any = []
  allArticles: any

  constructor(private appstorage: AppstorageService, private loadCtrl: LoadingController, private http: HttpClient) { }

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
        this.allArticles = res
      })
    }).then(async () => await load.dismiss())
  }

  ngOnInit() {
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

  filterPdfs(){
    
    
    this.searchedArticles = this.allArticles.filter((pdf: any) =>
      pdf.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // console.log(this.searchedArticles);
    
  }

}
