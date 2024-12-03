import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtDetailPage } from './art-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ArtDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtDetailPageRoutingModule {}
