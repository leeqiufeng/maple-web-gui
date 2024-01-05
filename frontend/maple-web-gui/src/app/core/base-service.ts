import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { Observable } from "rxjs";

export const BASE_PATH = new InjectionToken<string>('basePath');

export class BaseService {

  private basePath: string;

  constructor(private _http: HttpClient,
    private _basePath: string) {
    this.basePath = _basePath;
  }

  protected POST<T extends any>(action: string, data?: NzSafeAny, observe: any = 'body', reportProgress: boolean = false) {
    let headers = new HttpHeaders();

    const httpHeaderAcceptSelected: string | undefined = undefined;
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this._http.post<T>(`${this.basePath}/${action}`,
      data,
      {
        withCredentials: false,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  protected GET<T extends any>(action: string, data?: NzSafeAny, observe: any = 'body', reportProgress: boolean = false) {
    let headers = new HttpHeaders();

    const httpHeaderAcceptSelected: string | undefined = undefined;
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this._http.get<T>(`${this.basePath}/${action}`,
      {
        withCredentials: false,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  private selectHeaderContentType(contentTypes: string[]): string | undefined {
    if (contentTypes.length == 0) {
      return undefined;
    }

    let type = contentTypes.find(x => this.isJsonMime(x));
    if (type === undefined) {
      return contentTypes[0];
    }
    return type;
  }

  private isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
    return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
  }
}