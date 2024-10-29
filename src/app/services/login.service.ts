import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../common/login';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private http:HttpClient) { }

  login(login:Login): Observable<Login>{
  return this.http.post<Login>('http://localhost:8002/user/login',login)
  .pipe(catchError((error: any) => {
    console.log(error);
    if(error.status === 400){
      return throwError(()=> new Error('BAD Request'))
    }
    else if (error.status === 401) {
      return throwError(() => new Error('Invalid Credentials'));
    } else if(error.status === 406) {
      return throwError(() => new Error('account is not active'));
      
    }
    else{
      return throwError(()=>new Error('An unexpected error occurred'))
    }
  })

);

  }

}
