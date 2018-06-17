import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import { AppComponent } from './app.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
// ];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragulaModule,
    //RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
