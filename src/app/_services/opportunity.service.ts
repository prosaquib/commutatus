import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from "@angular/http";
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OpportunityService{
    
    options: RequestOptions;
    headers: Headers;
    constructor(private _http:Http){
    this.headers = new Headers({
        "Content-Type": "application/json",
        'Accept': 'q=0.8;application/json;q=0.9'
    })
    }

    private serverUrl = "http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com";

    getOpportunity():Observable<any>{
        let url = this.serverUrl+'/v2/opportunities/525?access_token='+'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c'
        return this._http.get(url,{headers:this.headers})
        .map((res:Response)=>res.json()) 
        .catch(error=>{return Observable.throw(error)})
    }

    
}
