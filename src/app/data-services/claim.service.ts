import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Claim} from "../data-models/claim";
import {Search} from "../data-models/search";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  constructor(private http: HttpClient,private tokenStorage :TokenStorageService) {  }

  public findAllClaims(body? : Search) : Observable<Claim[]> {
    let lang=this.tokenStorage.getLanguage();
    if(!body){
      body=new Search();
    }
    return this.http.post<Claim[]>(`/api/judgements/${lang}`, body);
  }

  public fileUpload(claim :Claim, formData :FormData) {
     return this.http.post(`/fileUpload/${claim.caseId}/${claim.judgementId}`,formData);
  }
}
