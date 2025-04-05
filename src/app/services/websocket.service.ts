import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080');
    this.socket$.subscribe(console.log);
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages() {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }
}
