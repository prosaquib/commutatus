import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class OpportunityService {
    options: RequestOptions;
    headers: Headers;
    private serverUrl = '//gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com';
    constructor(private _http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
        });

        this.options = new RequestOptions({ headers: this.headers });
    }


    getOpportunity(): Observable<any> {
        let url = this.serverUrl + '/v2/opportunities/526?access_token=' + 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c'
        return this._http.get(url, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(error => { return Observable.throw(error) })
    }

    updateOpportunity(param: any): Observable<any> {
        let url = this.serverUrl + '/v2/opportunities/526?access_token=' + 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';
        let body = JSON.stringify(param);
        return this._http.patch(url, body, this.options)
            .map((res: Response) => res.json())
            .catch(error=>{return Observable.throw(error)});
            

    }
}
