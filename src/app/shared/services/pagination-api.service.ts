import { Injectable, InjectionToken, inject } from '@angular/core';
import { jsonServerLinkParser } from './json-server-link-parser';
import { HttpResponse } from '@angular/common/http';

export type ResponseParserFunction = (response: HttpResponse<any>) => PageMetaData

export const PAGE_RESPONSE_PARSER_TOKEN: InjectionToken<ResponseParserFunction> = new InjectionToken('Link Parser', {
  providedIn: 'root',
  factory: () => jsonServerLinkParser
})

export type PageMetaData = {
  curentPage : number
  lastPage : number
  pageSize : number
}

export type Page<T> = {
  data: T[] | null
} & PageMetaData

@Injectable({
  providedIn: 'root'
})
export class PaginationApiService {

  responseParser = inject(PAGE_RESPONSE_PARSER_TOKEN)

  responseToPage<T>(response: HttpResponse<T[]>): Page<T> {

    const metaData = this.responseParser(response)

    console.log(metaData);
    console.log(response.body);

    return {
      ...metaData,
      data: response.body
    }
  }
}
