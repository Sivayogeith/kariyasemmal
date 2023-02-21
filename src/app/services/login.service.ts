import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseURL}/login`;
    return this.http.post(url, { username: username, password: password });
  }

  getLoginData() {
    let token: any = localStorage.getItem('token');
    if (token) {
      let data = JSON.parse(atob(token.split('.')[1]));
      return data;
    }
    return false;
  }
}
