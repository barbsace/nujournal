import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmissionPageRoutingModule } from './submission-routing.module';

import { SubmissionPage } from './submission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SubmissionPageRoutingModule
  ],
  declarations: [SubmissionPage]
})
export class SubmissionPageModule {}
