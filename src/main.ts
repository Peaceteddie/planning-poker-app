import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { WebSocketService } from './app/services/websocket.service';

bootstrapApplication(AppComponent, {
  providers: [
    WebSocketService,
  ],
}).catch((err) => console.error(err));
