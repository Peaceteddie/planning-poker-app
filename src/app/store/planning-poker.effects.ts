import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { WebSocketService } from '../services/websocket.service';

@Injectable()
export class PlanningPokerEffects {
    listenForWebSocketMessages$: Observable<Action>;
    sendWebSocketMessages$: Observable<void>;

    constructor(private actions$: Actions, private webSocketService: WebSocketService) {
        this.listenForWebSocketMessages$ = createEffect(() =>
            this.webSocketService
                .getMessages()
                .pipe(
                    map((message) => {
                        console.log(message);
                        return message;
                    })
                )
        );

        this.sendWebSocketMessages$ = createEffect(() =>
            this.actions$.pipe(
                map((action) => {
                    console.log(action);
                    this.webSocketService.sendMessage(action);
                })
            ),
            { dispatch: false }
        );
    }
}