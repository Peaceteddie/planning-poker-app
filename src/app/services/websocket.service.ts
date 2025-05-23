import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../types/message.interface';
import { User } from '../types/user.class';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  userId: string;

  onNewVote: Subject<User> = new Subject<User>();
  onRevealVotes: Subject<boolean> = new Subject<boolean>();
  onUpdateUser: Subject<User> = new Subject<User>();
  onUpdateUsers: Subject<User[]> = new Subject<User[]>();

  private socket$: WebSocketSubject<Message>;
  private subscription: Subscription;


  constructor() {
    this.userId = this.generateUserId();
    this.socket$ = this.createWebSocketConnection('ws://localhost:8080');
    this.subscription = this.listenToMessages();
  }

  private createWebSocketConnection = (url: string): WebSocketSubject<any> => {
    const socket = webSocket({
      url,
      openObserver: {
        next: () => console.log('WebSocket connection established')
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket connection closed. Reconnecting...');
          setTimeout(() => this.socket$ = this.createWebSocketConnection(url), 1000);
        },
      },
    });

    socket.subscribe({
      next: (message) => this.handleIncomingMessage(message),
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.warn('WebSocket connection closed'),
    });

    return socket;
  };

  private generateUserId = (): string => Math.random().toString(36).substring(2);

  private listenToMessages = (): Subscription => this.socket$.subscribe(this.handleIncomingMessage);

  private handleIncomingMessage = (message: any) => {
    switch (message.type) {
      case 'castVote':
        this.onNewVote.next(message.user);
        break;

      case 'hideVotes':
        this.onRevealVotes.next(false);
        break;

      case 'revealVotes':
        this.onRevealVotes.next(true);
        break;

      case 'updateUsers':
        this.onUpdateUsers.next(message.users);
        break;

      default:
        console.warn(`Unhandled message type: ${message.type}`);
    }
  };

  addUser = (user: User) => this.sendMessage({ type: 'addUser', user });
  castVote = (user: User) => this.sendMessage({ type: 'castVote', user });
  hideVotes = () => this.sendMessage({ type: 'hideVotes' });
  removeUser = (user: User) => this.sendMessage({ type: 'removeUser', user });
  resetVotes = (users: User[]) => { this.hideVotes(); this.sendMessage({ type: 'resetVotes', users }); };
  revealVotes = () => this.sendMessage({ type: 'revealVotes' });

  getMessages = (): Observable<any> => this.socket$.asObservable();
  sendMessage = (message: any) => this.socket$?.next(message);
  closeConnection = () => this.socket$?.complete();

  ngOnDestroy = () => {
    this.closeConnection();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.onNewVote.complete();
    this.onUpdateUsers.complete();
  };
}
