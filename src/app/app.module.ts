import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { BackendService } from './shared/backend.service';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { DynamicFormComponent } from './form/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './form/dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { LoadingComponent } from './form/dynamic-form/loading/loading.component';
import { NotificationsService } from './shared/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FormComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [BackendService, NotificationsService],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
