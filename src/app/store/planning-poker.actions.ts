import { createAction, props } from '@ngrx/store';

export const addUser = createAction(
    '[Planning Poker] Add User',
    props<{ id: string; name: string }>()
);

export const removeUser = createAction(
    '[Planning Poker] Remove User',
    props<{ id: string }>()
);

export const setVote = createAction(
    '[Planning Poker] Set Vote',
    props<{ userId: string; vote: number | null }>()
);

export const setRoom = createAction(
    '[Planning Poker] Set Room',
    props<{ room: string }>()
);

export const revealVotes = createAction('[Planning Poker] Reveal Votes');

export const resetVotes = createAction('[Planning Poker] Reset Votes');

export const clearUsers = createAction('[Planning Poker] Clear Users');

export const clearRoom = createAction('[Planning Poker] Clear Room');
