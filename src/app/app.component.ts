import { Component } from '@angular/core';
import { LobbyComponent } from './lobby/lobby.component';
import { PokerTableComponent } from './poker-table/poker-table.component';

@Component({
  selector: 'app-root',
  imports: [
    LobbyComponent,
    PokerTableComponent
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  roomKey: string | null = null;
}