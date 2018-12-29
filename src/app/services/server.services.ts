import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class ServerServices{
    constructor(private http: Http){}

    //'Authorization': 'my-auth-token'
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        
      })
    };
    
    //Returns the data with /GET
    getTradeServerData() {
        return this.http.get('http://localhost:3000/tradedata')
          .map(
            (response: Response) => {
              const data = response.json();
            //   for (const server of data) {
            //     server.name = 'FETCHED_' + server.name;
            //   }
            console.log('data');
            console.log(data);
              return data;
            }
          )
          .catch(
            (error: Response) => {
              return Observable.throw('Something went wrong');
            }
          );
      }

      //Add the data with /POST 
      setTradeServerData(tradeData: any[]) {       
        const headers = new Headers({'Content-Type': 'application/json'});         

        console.log(tradeData);         
        return this.http.post('http://localhost:3000/inserttradedata'
        ,
        {
          managerName: tradeData[0]["managerName"],
           managerRoles: tradeData[0]["managerRoles"],
           tradeDate :tradeData[0]["tradeDate"],
           commodity : tradeData[0]["commodity"],
           side : tradeData[0]["side"],
           quantity : tradeData[0]["quantity"],
           price : tradeData[0]["price"],
           counterParty :tradeData[0]["counterParty"],
           location : tradeData[0]["location"],
           tradeStatus : tradeData[0]["tradeStatus"],
           currency : tradeData[0]["currency"],
         _links_self_href : tradeData[0]["_links_self_href"],
           _links_trade_href : tradeData[0]["_links_trade_href"]
       }   
        ,{headers: headers});     
      }

     

}