import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { TradesComponent } from './trades/trades.component';
import { TransfersComponent } from './transfers/transfers.component';
import { TransportsComponent } from './transports/transports.component';
import { ServerServices } from './services/server.services';
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';



const appRoute : Routes = [
{ path:'', component: TradesComponent},
{ path:'transfers', component: TransfersComponent},
{ path:'transports', component: TransportsComponent}


];
@NgModule({
  declarations: [
    AppComponent,
    TradesComponent,
    TransfersComponent,
    TransportsComponent    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    HttpModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  exports:[RouterModule],
  providers: [ServerServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
