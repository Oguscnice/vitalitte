import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewDto} from "../../../../../shared/interfaces/Review";
import {VITALITTE_PROJECT} from "../../../../../shared/variables/AppConfig";
import {Page, PaginationReviewsFiltered} from "../../../../../shared/interfaces/Page";
import {ResponseEntity} from "../../../../../shared/interfaces/ResponseEntity";

@Injectable({
  providedIn: 'root'
})
export class ApiReviewAdminService {

  private http = inject(HttpClient);

  getAllReviewStatus(): Observable<ReviewDto['status'][]> {
    return this.http.get<ReviewDto['status'][]>(VITALITTE_PROJECT.back.url + "/review-status")
  }

  changeStatus(review: ReviewDto): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/reviews/change-status", review)
  }
}
