import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Attribute} from "../data-models/attribute";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlockedService {

  constructor(private http:HttpClient) { }
  public findAll() : Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`/api/block/list`);
  }
}
