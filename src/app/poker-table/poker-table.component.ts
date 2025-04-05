import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { WebSocketService } from '../services/websocket.service';
import { addUser } from '../store/planning-poker.actions';
import { selectUsers } from '../store/planning-poker.selectors';
import { User } from '../store/planning-poker.types';

@Component({
  selector: 'app-poker-table',
  imports: [CommonModule],
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.css',
})
export class PokerTableComponent implements OnInit {
  @Input() userName!: string;

  users: User[] = [];
  users$: Observable<User[]>;

  isHost: boolean = false;
  userId: string = crypto.randomUUID();
  fibonacciSequence = [0, 1, 2, 3, 5, 8, 13, 20];
  lightnessValues = this.fibonacciSequence.map((_, i) => 150 - (i * 15));

  constructor(private store: Store, private webSocketService: WebSocketService) {
    this.users$ = this.store.select(selectUsers);
  }

  ngOnInit() {
    this.store.dispatch(addUser({ id: this.userId, name: this.userName }));
    this.users$.pipe(take(1)).subscribe(this.checkForHost);
  }

  checkForHost(users: User[]) {
    this.isHost = users.length === 1;
    console.log('Is host:', this.isHost);
    console.log('Users:', users);
  }

  castVote(vote: number) { }
}
