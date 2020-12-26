import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from 'src/Model/User';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient:HttpClient) { }

apiUrl:string = "http://localhost:3000";


public login(email: string, password: string): Observable<User> {
  let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
  })}

  return this.httpClient.post<User>(this.apiUrl+"/user/login",
     { email: email, password: password }, httpOptions)
      .pipe(
      retry(1))
 }

 public register(user: User): Observable<User> {
  let httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
  })}

  return this.httpClient.post<User>(this.apiUrl+"/user/register",
   user, httpOptions)
      .pipe(
      retry(1))
 }

 errorHandle(error)
 {
   console.log("handle geldi");
   console.log(error);
  return throwError(error);
 }

}
