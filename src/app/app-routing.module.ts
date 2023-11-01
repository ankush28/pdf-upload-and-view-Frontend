import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  { path: 'pdf/:id', component: PdfViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
