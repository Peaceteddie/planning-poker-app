import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';
import { User } from '../types/user.class';

@Component({
  selector: 'app-poker-table',
  imports: [CommonModule],
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.css',
})
export class PokerTableComponent {
  @Input() userName!: string;

  readonly fibonacciSequence = [0, 1, 2, 3, 5, 8, 13, 20];
  readonly lightnessValues = this.fibonacciSequence.map((_, i) => 150 - (i * 15));

  private user: User;
  private users: Map<string, User> = new Map<string, User>();

  constructor(private socket: WebSocketService) {
    this.user = new User(socket.userId, this.userName);
    this.socket.addUser(this.user);
    this.socket.onNewVote.subscribe(this.updateUser);
    this.socket.onUpdateUsers.subscribe(this.updateUsers);
  }

  castVote = (vote: number) => {
    this.socket.castVote({ ...this.user, vote });
  }

  updateUser = (user: User) => {
    this.users.set(user.id, user);
    console.log(this.users);
  }

  updateUsers = (users: User[]) => {
    this.users.clear();
    users.forEach(user => this.users.set(user.id, user));
    console.log(this.users);
  }
}
