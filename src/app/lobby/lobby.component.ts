import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  imports: [FormsModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
  roomKey: string = '';
  userName: string = '';

  onSubmit() {
    // Handle room creation or joining logic here
  }
}
