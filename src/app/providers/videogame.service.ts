import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { videogamesConfig } from '../../environments/config';

@Injectable()
export class VideogameService {

  private searchUrl: string = `https://www.giantbomb.com/api/search/?api_key=${videogamesConfig.apiKey}&format=jsonp&json_callback=JSONP_CALLBACK&resources=game`;

  constructor(
    private http: Http,
    private _jsonp: Jsonp
  ) { }

  getVideogames(query: string): Observable<any[]> {
    return this._jsonp
    .get(`${this.searchUrl}&query=${query}`, this.getHeaders)
    .map(this.mapVideogames)
    .catch(this.handleError);
  }

  private mapVideogames(res: Response) {
    let body = res.json();
    let returnList = [];
    if (body.results.length < 9) {
      body.results.forEach(element => {
        let returnJson = {
        "title": '',
        "poster": ''
        };
        returnJson.title = element.name;
        returnJson.poster = element.image.small_url;
        returnList.push(returnJson);
        });
    }
    else {
      for (var _i = 0; _i < 8; _i++) {
        let returnJson = {
        "title": '',
        "poster": ''
        };
        returnJson.title = body.results[_i].name;
        returnJson.poster = body.results[_i].image.small_url;
        returnList.push(returnJson);
      }
    }
    return returnList;
  }

  private getHeaders(){
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers});
    return options;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
