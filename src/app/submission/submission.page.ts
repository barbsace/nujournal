/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AppstorageService } from '../services/appstorage.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios'
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.page.html',
  styleUrls: ['./submission.page.scss'],
})
export class SubmissionPage implements OnInit {

  year = new Date().getFullYear()
  member: any
  isLogged = false

  selectedFile:any
  selectedFileName: any

  // subForm!: FormGroup


    author: any = ''
    department: any = ''
    title: any = ''
    abstract: any = ''
    article: any = '' 


  constructor(private appstorage: AppstorageService, private loadCtrl: LoadingController, private alertCtrl: AlertController) { }

  async ngOnInit() {
    // this.initForm()
  }

  // initForm(){
  //   this.subForm = this.fb.group({
  //     author: ['', Validators.required],
  //     department: ['', Validators.required],
  //     keyword: ['', Validators.required],
  //     title: ['', Validators.required],
  //     abstract: ['', Validators.required],
  //     article: ['', Validators.required],
  //   })
  // }

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

  // get authors(){
  //   return this.subForm.get('authors') as FormArray
  // }

  // addAuthors(){
  //   const authorGroup = this.fb.group({
  //     value: ['', Validators.required]
  //   })
  //   this.authors.push(authorGroup)
  // }

  // removeAuthor(index: number) {
  //   this.authors.removeAt(index);
  // }

  async onFileSelected(){
    const pdf = await FilePicker.pickFiles({
      types: ['application/pdf'],
      readData: true
    })

    this.article = pdf.files[0].data;
    
    // const input = event.target as HTMLInputElement;

    // if (input.files && input.files.length > 0) {
    //   this.selectedFile = input.files[0];
    //   const reader = new FileReader();
    //   reader.readAsArrayBuffer(this.selectedFile);
      

    //   reader.onload = () => {
    //     console.log(reader.result);
    //   }
    // }
    
  }

  async onSubmit(form: any){
    // console.log('clicked');
    
    const formData = {
      author: this.author,
      title: this.title,
      department: this.department,
      abstract: this.abstract,
      article: this.article,
    }

    // console.log(formData);
  

    if(this.article === ''){
      const alert = await this.alertCtrl.create({
        message: 'Article PDF not provided, click the article button to pick article PDF.',
        header: 'Reminder',
        buttons: ['Dismiss']
      })

      await alert.present()
    } else {
      axios.post('http://localhost/journal/submission.php', formData).then(async (res) => {
        if(res.data === 'Article Submitted'){
          const alert = await this.alertCtrl.create({
            message: res.data,
            header: 'Reminder',
            buttons: ['Dismiss']
          })
    
          await alert.present()
          this.article = ''
          this.title = ''
          this.abstract = ''
          this.department = ''
          this.author = ''
        } else {
          const alert = await this.alertCtrl.create({
            message: res.data,
            header: 'Reminder',
            buttons: ['Dismiss']
          })
    
          await alert.present()
        }
      })
    } 

    
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
