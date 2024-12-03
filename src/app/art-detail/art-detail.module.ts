import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtDetailPageRoutingModule } from './art-detail-routing.module';

import { ArtDetailPage } from './art-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtDetailPageRoutingModule
  ],
  declarations: [ArtDetailPage]
})
export class ArtDetailPageModule {}
