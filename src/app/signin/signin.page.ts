/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { AppstorageService } from '../services/appstorage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  year = new Date().getFullYear()
  logForm!: FormGroup

  constructor(private fb: FormBuilder, private alertCtrl: AlertController, private router: Router, private storageService: AppstorageService) { }

  ngOnInit() {
    this.logForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  openMenu(){
    const nav = document.querySelector('.nav-list')
    nav?.classList.toggle('open')
  }

  onSubmit(){
    const formData = this.logForm.value
    // console.log(formData);

    axios.post('http://alamin.lovestoblog.com/login.php', formData).then(async (res) => {
      const result = res.data;
      if(result === 'emailErr'){
        const alert = await this.alertCtrl.create({
          header: 'Message',
          message: 'Email do not Exist.',
          buttons: ['Dismiss']
        })
        alert.present()
      } else if(result === 'passwordErr'){
        const alert = await this.alertCtrl.create({
          header: 'Message',
          message: 'Wrong Password, try again',
          buttons: ['Dismiss']
        })
        alert.present()
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Message',
          message: 'Signed In.',
          buttons: ['Dismiss']
        })
        alert.present()
        this.storageService.set('user_data', res.data)
        this.router.navigate(['/'])
      }
    })    
  }

}
