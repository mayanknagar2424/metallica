import { Component,OnInit } from '@angular/core';
import { ServerServices } from './services/server.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public tradedata : JSON;
  public data : any[];
  //tradeServerService : ServerServices; 
  title = 'Metallica';
  constructor(private serverService: ServerServices){

  this.serverService.getTradeServerData()
      .subscribe(
        (data:JSON)=> this.tradedata = data,
        (error)=> console.log(error),
        ()=> {   //Runs on Completion
          //console.log(this.tradedata);  
          console.log('start');         
          this.data = this.tradedata["tradedata"];          
         console.log(this.tradedata["tradedata"][0]); 
          console.log('end');         
          
        }  
      );
      
  }
  
  ngOnInit():void{
    //this.data = this.tradedata;
  }
}
