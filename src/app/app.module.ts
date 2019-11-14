import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApartmentClassComponent} from './apartmentClass.component';
import {HttpService} from './http.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent, ApartmentClassComponent
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
