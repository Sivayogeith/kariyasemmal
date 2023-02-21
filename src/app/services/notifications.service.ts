import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private baseURL = environment.baseURL;
  private baseWsURL = environment.baseWsURL;
  private socket!: WebSocket;
  constructor(private http: HttpClient) {}

  getNotifications(to: string, id: string): Observable<any> {
    const url = `${this.baseURL}/notifications?id=${id}&to=${to}`;
    return this.http.get(url);
  }

  markAsRead(id: string): Observable<any> {
    const url = `${this.baseURL}/markAsRead/${id}`;
    return this.http.put(url, {});
  }

  deleteNotification(id: string): Observable<any> {
    const url = `${this.baseURL}/deleteNotification/${id}`;
    return this.http.delete(url);
  }
  subscribeNotifications(to: string, id: string): Observable<any> {
    // Open a WebSocket connection to /subscribeNotifications
    this.socket = new WebSocket(
      `${this.baseWsURL}/subscribeNotifications?id=${id}&to=${to}`
    );

    // Listen for messages from the server
    return new Observable((observer) => {
      this.socket.onmessage = (event) => {
        observer.next(event.data);
      };
    });
  }

  // Close the WebSocket connection when the service is destroyed
  ngOnDestroy() {
    this.socket.close();
  }
}
