import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerServices } from '../services/server.services';
import { Observable, empty } from 'rxjs';
import {ColumnApi, GridApi, GridOptions} from "ag-grid-community";


@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']  
})

export class TradesComponent implements OnInit, AfterViewInit {
  tradedata : JSON;
  newTradedata : any[];
  public id : String;
  public tradeDate : string;
  public commodity : string;
  public side : string;
  public counterParty : string;
  public price : number;
  public quantity: number;
  public location: string;

  isSaveDisabled:boolean = true;
  isCancelDisabled:boolean = true;
  public isReadOnlytrades : boolean = true;

  private gridOptions: GridOptions;
  private api: GridApi;
  private columnApi: ColumnApi;
  private defaultColDef;

  private displayGrid = false;
  private columnDefs;

  private rowSelection;
  selectedRows : string;
  tradeServerService : ServerServices;

  constructor(private router:Router,
    private serverService:ServerServices) {
      
      this.tradeServerService = this.serverService; 

      this.columnDefs = [
        {headerName: 'TradeDate', field: 'tradeDate'},
        {headerName: 'Commodity', field: 'commodity'},
        {headerName: 'Side', field: 'side'},
        {headerName: 'Qty(MT)', field: 'quantity'},
        {headerName: 'Price/MT', field: 'price'},
        {headerName: 'CounterParty', field: 'counterParty'},
        {headerName: 'Location', field: 'location'}
       
    ];

      this.rowSelection = "single";
      this.defaultColDef = { width: 105 };
      
      this.gridOptions = <GridOptions>{
        context: {
            componentParent: this
        }
    };
    this.gridOptions.columnDefs = this.columnDefs;

    this.serverService.getTradeServerData()
      .subscribe(
        (data:JSON)=> this.tradedata = data,
        (error)=> console.log(error),
        ()=> {   //Runs on Completion
          //console.log(this.tradedata);           
          console.log(this.tradedata["tradedata"]);
          //console.log(this.tradedata["tradedata"][0]["managerName"]);   
          this.tradeDataForGrid = this.tradedata["tradedata"]; 
          this.gridOptions.rowData = this.tradeDataForGrid;          
          
        }  
      );
       
     }

   
    AddSaveNewTradeData(){          
     
       this.newTradedata = 
        [{
          managerName: 'Mayank Nagar',
          managerRoles: 'GM Services',
          tradeDate : this.tradeDate, 
          commodity : this.commodity,
          side : this.side,
          quantity : this.quantity,
          price : this.price,
          counterParty : this.counterParty,
          location :this.location,
          tradeStatus : 'OPEN',
          currency : 'USD',
          _links_self_href : 'http://localhost:3000/tradedata/1',
          _links_trade_href : 'http://localhost:3000/tradedata/1'         
        }];
      
      
    //  tradeJson =JSON.parse(this.ss);

      console.log('Write the data to be sent');
      console.log(this.newTradedata);
      console.log('calling Post...');
      this.tradeServerService.setTradeServerData(this.newTradedata)
          .subscribe(
            (response)=>console.log(response),
            (error)=>console.log(error),
            ()=>{
              //On completion Reload the page
              window.location.reload();
              this.isReadOnlytrades = true;
              this.isSaveDisabled = true;
              this.isCancelDisabled = true;
              alert('New Record added, refresh to view');
            }
          );

      //this.clearTrades();

    }


     ngOnInit(){
     
     }

     ngAfterViewInit() {
      
  }

setTradeInputReadOnlyOnOff(){
//alert('Set active');
  this.isReadOnlytrades = false; 
  this.isSaveDisabled = false;
  this.isCancelDisabled = false;

  
}

//this.rowSelection = "single";

// tradeData = [ 
//     {make: 'Toyota', model: 'Celica', price: 35000},
//     {make: 'Ford', model: 'Mondeo', price: 32000},
//     {make: 'Porsche', model: 'Boxter', price: 72000}
// ];

tradeDataForGrid = [];

  onLoadServer() {
    
    // complex calculation
    //this.router.navigate(['/', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  
    //this.displayGrid = true;
  
  // this.serverService.getTradeServerData()
  // .subscribe(
  //   (data:JSON)=> this.tradedata = data,
  //   (error)=> console.log(error),
  //   ()=> {   //Runs on Completion
  //     //console.log(this.tradedata);           
  //     console.log(this.tradedata["tradedata"]);
  //     //console.log(this.tradedata["tradedata"][0]["managerName"]);   
  //     this.tradeDataForGrid =  this.tradedata["tradedata"]; 
     
  //   }  
  // );  
  }

  AddNewTrades(){
    //alert('Added');    
    //this.clearTrades();
    this.setTradeInputReadOnlyOnOff();

  }
  clearTrades(){
  this.tradeDate = "";
  this.commodity = "";
  this.side = "";
  this.counterParty = "";
  this.price = 0;
  this.quantity = 0;
  this.location = "";
  }


onRowClicked(event: any) 
{ 
  console.log('row', event.data.tradeDate); 
  this.tradeDate = event.data.tradeDate;
  this.commodity = event.data.commodity;
  this.side = event.data.side;
  this.counterParty = event.data.counterParty;
  this.price = event.data.price;
  this.quantity = event.data.quantity;
  this.location = event.data.location;
  
  this.isReadOnlytrades = true;
  this.isSaveDisabled = true;
  this.isCancelDisabled = true;
}
onCellClicked(event: any) { console.log('cell', event); }
onSelectionChanged(event: any) { console.log("selection", event); }


onGridReady(params) {   
    this.api = params.api;
    this.columnApi = params.columnApi;
    
  }

}

