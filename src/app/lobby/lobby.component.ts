import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
  @Output() UserName = new EventEmitter<string>();

  userName = new FormControl<string>('', { nonNullable: true, validators: Validators.required });

  onSubmit() {
    if (this.userName.valid) {
      this.UserName.emit(this.userName.value);
    }
  }
}
