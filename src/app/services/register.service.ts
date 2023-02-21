import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string): Observable<any> {
    const url = `${this.baseURL}/register`;
    return this.http.post(url, {
      username: username,
      password: password,
      email: email,
    });
  }
}
