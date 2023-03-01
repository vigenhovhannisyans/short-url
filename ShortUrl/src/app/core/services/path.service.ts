import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IResponse } from '../interfaces/response';
import { IUrlData } from '../interfaces/url-data';
@Injectable({
  providedIn: 'root'
})
export class PathService {
  private apiURL: string = environment.API_URL;
  private httpParams: HttpParams = new HttpParams();
  constructor(
    private readonly http: HttpClient,
  ) { }

  public getShortURL(url: string): Observable<IResponse<IUrlData>> {
    this.httpParams = this.httpParams.set('url', url)
    return this.http.get<IResponse<IUrlData>>(`${this.apiURL}/shorten`, {params: this.httpParams})
  }
}
