import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OrderByKeyPipe } from "../pipes/order-by-key.pipe";
import { WebSocketService } from '../services/websocket.service';
import { User } from '../types/user.class';

@Component({
  selector: 'app-poker-table',
  imports: [CommonModule, OrderByKeyPipe],
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.css',
})
export class PokerTableComponent implements OnInit {
  @Input() userName!: string;

  readonly fibonacciSequence = [0, 1, 2, 3, 5, 8, 13, 20];
  readonly lightnessValues = this.fibonacciSequence.map((_, i) => 150 - (i * 15));

  isHost: boolean = false;
  isVotesRevealed: boolean = false;

  user!: User;
  users: Map<string, User> = new Map<string, User>();


  get votes(): Map<string, User> {
    return new Map<string, User>(
      Array
        .from(this.users.entries())
        .filter(([_, user]) => user.vote !== undefined)
    );
  }

  constructor(private socket: WebSocketService) { }

  ngOnInit() {
    this.checkIsHost();

    this.user = new User(this.socket.userId, this.userName);
    this.socket.addUser(this.user);

    this.socket.onNewVote.subscribe(this.updateUser);
    this.socket.onUpdateUsers.subscribe(this.updateUsers);
  }

  castVote = (vote: number) => {
    this.socket.castVote({ ...this.user, vote });
  }

  checkIsHost() {
    this.socket.onUpdateUsers
      .pipe(take(1))
      .subscribe(users => {
        this.isHost = users.length === 1;
      });
  }

  resetVotes = () => {
    this.users.forEach((user: User) => this.users.set(user.id, { ...user, vote: undefined }))
    this.socket.resetVotes(Array.from(this.users.values()));
  }

  revealVotes = () => {
    this.isVotesRevealed = true;
    // this.socket.revealVotes(Array.from(this.users.values()));
  }

  updateUser = (user: User) => {
    this.users.set(user.id, user);
  }

  updateUsers = (users: User[]) => {
    this.users.clear();
    users.forEach(user => this.users.set(user.id, user));
  }
}
