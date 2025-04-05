import { bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { WebSocketService } from './app/services/websocket.service';
import { PlanningPokerEffects } from './app/store/planning-poker.effects';
import { planningPokerReducer } from './app/store/planning-poker.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ planningPoker: planningPokerReducer }),
    provideEffects([PlanningPokerEffects]),
    WebSocketService,
  ],
}).catch((err) => console.error(err));
