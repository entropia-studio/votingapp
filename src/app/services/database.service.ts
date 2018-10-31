import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../interfaces/poll';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private http: HttpClient) { }


  getUrlApi = (): string => {
    var apiUrl = location.protocol + '//' + location.hostname;       
    return location.hostname == 'localhost' ? apiUrl + ':8080/api/polls'  : apiUrl + '/api/polls';
  }

  getPolls(idUser: string | null): Observable<Poll[]>{
    console.log('idUser',idUser)
    if (idUser){
      return this.http.get<Poll[]>(this.getUrlApi() + '/' + idUser);  
    }
    return this.http.get<Poll[]>(this.getUrlApi());
  }

  getPoll(idPoll: string): Observable<Poll>{
    return this.http.get<Poll>(this.getUrlApi() + '/' + idPoll);
  }

}
