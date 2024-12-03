/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  year = new Date().getFullYear()
  regForm!: FormGroup

  constructor(private fb: FormBuilder, private alertCtrl: AlertController, private loadCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      affliation: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required]
    })
  }

  openMenu(){
    const nav = document.querySelector('.nav-list')
    nav?.classList.toggle('open')
  }

  async onSubmit(){
    let formData = this.regForm.value
    if(formData.password === formData.repeat_password){
      axios.post('http://alamin.lovestoblog.com/reguser.php', formData).then(async res => {
        const result = res.data;
        if(result === 'User Registered'){
          const alert = await this.alertCtrl.create({
            message: 'Your application has is being submitted, we will get back at you in a few days',
            header: 'Message',
            buttons: ['Dismiss']
          })
          await alert.present()
          this.regForm.reset()
        } else if (result === 'User Existed') {
          const alert = await this.alertCtrl.create({
            message: 'Associated email already have an account, sign in.',
            header: 'Message',
            buttons: ['Dismiss']
          })
          alert.present()
          this.router.navigate(['/signin'])
        }
      })
    } else {
      const alert = await this.alertCtrl.create({
        message: 'Password do not match.',
        header: 'Message',
        buttons: ['Dismiss']
      })
      alert.present()
    }
  }

}
