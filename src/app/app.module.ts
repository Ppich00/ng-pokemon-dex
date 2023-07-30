import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {DashToUnderscorePipe} from "./pipe/dash-to-underscore.pipe";
import {CommonModule} from "@angular/common";
import {LoadingImgDirective} from './directive/loading-img.directive';
import {LoadingComponent} from "./component/loading/loading.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    DashToUnderscorePipe,
    LoadingComponent,
    LoadingImgDirective,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
