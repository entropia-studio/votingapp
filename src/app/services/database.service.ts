import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../interfaces/poll';
import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private http: HttpClient) { }
  

  getPolls(idUser: string | null): Observable<Poll[]>{    
    if (idUser){
      return this.http.get<Poll[]>(environment.apiUrl + '/' + idUser);  
    }
    return this.http.get<Poll[]>(environment.apiUrl);
  }

  getPoll(idPoll: string): Observable<Poll>{
    return this.http.get<Poll>(environment.apiUrl + '/chart/' + idPoll);
  }

  addPoll(poll: Poll): Observable<Poll>{
    return this.http.post<Poll>(environment.apiUrl + '/add',poll,httpOptions);
  }

  updatePoll(poll: Poll): Observable<Poll>{
    return this.http.post<Poll>(environment.apiUrl + '/update',poll,httpOptions);
  }

  deletePoll(idPoll): Observable<any>{
    return this.http.delete(environment.apiUrl + '/delete/' + idPoll, httpOptions);
  }

}
