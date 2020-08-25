import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { FormComponent } from '../form/form.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'table' },
  // { path: '', pathMatch: 'full', redirectTo: 'survey' },
  { path: '', component: TableComponent },
  { path: 'survey', component: FormComponent },
  { path: 'survey/:name', component: FormComponent },
  { path: '**', component: TableComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
