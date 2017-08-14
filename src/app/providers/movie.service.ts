import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { config } from '../../environments/config';

@Injectable()
export class MovieService {
  private searchUrl: string = `https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&language=en-US`;
  constructor(private http: Http) { }

  getMovie(query: string): Observable<any> {
    return this.http
      .get(`${this.searchUrl}&query=${query}&page=1`, this.getHeaders)
      .map(this.mapJson)
      .catch(this.handleError);
  }

  getMovies(query: string): Observable<any[]> {
    return this.http
      .get(`${this.searchUrl}&query=${query}&page=1`, this.getHeaders)
      .map(this.mapMovies)
      .catch(this.handleError);
  }

  private mapJson(res: Response) {
    let returnJson = {
      "title": '',
      "poster": ''
    };
    let body = res.json();
    let mapUrl = 'http://image.tmdb.org/t/p/w500//'
    returnJson.title = body.results[0].title;
    returnJson.poster = mapUrl.concat(body.results[0].poster_path);
    return returnJson;
  }

  private mapMovies(res: Response) {
    let body = res.json();
    let returnList = [];
    body.results.forEach(element => {
      returnList.push(element.title);
    });
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
