import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../Model/user';
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
        retry(1));
 }


 public register(user: User): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
    })}

    return this.httpClient.post<User>(this.apiUrl+"/user/register",
    user, httpOptions)
        .pipe(
        retry(1));
 }


 public getAllUsers(): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
    })}

    return this.httpClient.get<User[]>(this.apiUrl+"/user/getUserList",
      httpOptions)
        .pipe(
        retry(1));
 }

 public getOnlineUserCount(userId,token): Observable<User> {
  let httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
  })}

  return this.httpClient.get<User>(this.apiUrl+"/user/getOnlineList/"+userId+"?userToken="+token,
    httpOptions)
      .pipe(
      retry(1));
}

public async getUserIpAdress() {
  
   return await this.httpClient.get("http://api.ipify.org/?format=json").toPromise();
}

 errorHandle(error)
 {
  return throwError(error);
 }

}
