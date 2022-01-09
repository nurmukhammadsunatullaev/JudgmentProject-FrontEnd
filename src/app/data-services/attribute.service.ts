import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attribute} from "../data-models/attribute";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  constructor(private http : HttpClient,private tokenStorage :TokenStorageService) {
  }

  public findAllByParentId(baseUrl : string, id : number = 0) : Observable<Attribute[]> {
    let lang=this.tokenStorage.getLanguage();
    return this.http.get<Attribute[]>(`${baseUrl}/${lang}/${id}`);
  }
}
