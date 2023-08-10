import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundlesComponent } from './Views/bundles/bundles.component';

const routes: Routes = [
  {path: '', component: BundlesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
