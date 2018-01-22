import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { videogamesConfig } from '../../environments/config';

@Injectable()
export class VideogameService {

  // https://www.giantbomb.com/api/search/?api_key=[YOUR API KEY]
  // http://www.giantbomb.com/api/[RESOURCE-TYPE]/[RESOURCE-ID]/?api_key=[YOUR-KEY]&format=[RESPONSE-DATA-FORMAT]&field_list=[COMMA-SEPARATED-LIST-OF-RESOURCE-FIELDS]

  private searchUrl: string = `https://www.giantbomb.com/api/search/?api_key=${videogamesConfig.apiKey}`;

  constructor() { }

}
