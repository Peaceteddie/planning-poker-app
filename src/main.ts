import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { planningPokerReducer } from './app/store/planning-poker.reducer'; // Adjust path if needed

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ planningPoker: planningPokerReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
}).catch((err) => console.error(err));