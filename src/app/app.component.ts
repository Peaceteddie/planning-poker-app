import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LobbyComponent } from './lobby/lobby.component';
import { PokerTableComponent } from './poker-table/poker-table.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    LobbyComponent,
    PokerTableComponent
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userName!: string;

  setUserName(userName: string) {
    this.userName = userName;
  }
}