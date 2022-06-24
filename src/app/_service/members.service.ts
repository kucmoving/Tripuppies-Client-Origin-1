import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/Pagination';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  PaginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) { }

  getMemebers(page?: number, itemsPerPage?:number){
    let params = new HttpParams();
    if (page!== null && itemsPerPage !== null){
      params = params.append("pageNumber", page.toString());
      params = params.append("pageSize", itemsPerPage.toString());
    }
    return this.http.get<Member[]>(this.baseUrl + "users", {observe: "response", params}).pipe(
      map(response => {
        this.PaginatedResult.result = response.body;
        if (response.headers.get("Pagination") !== null){
          this.PaginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.PaginatedResult;
      })
    )
  }


  getMember(username: string){
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of (member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}

