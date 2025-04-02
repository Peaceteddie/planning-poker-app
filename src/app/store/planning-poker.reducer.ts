import { createReducer, on } from '@ngrx/store';
import * as PlanningPokerActions from './planning-poker.actions';

export interface User {
    id: string;
    name: string;
    vote: number | null;
}

export interface PlanningPokerState {
    users: User[];
    votesRevealed: boolean;
    room: string | null;
}

export const initialState: PlanningPokerState = {
    users: [],
    votesRevealed: false,
    room: null,
};

export const planningPokerReducer = createReducer(
    initialState,
    on(PlanningPokerActions.addUser, (state, { id, name }) => ({
        ...state,
        users: [...state.users, { id, name, vote: null }],
    })),
    on(PlanningPokerActions.removeUser, (state, { id }) => ({
        ...state,
        users: state.users.filter((user) => user.id !== id),
    })),
    on(PlanningPokerActions.setVote, (state, { userId, vote }) => ({
        ...state,
        users: state.users.map((user) =>
            user.id === userId ? { ...user, vote } : user
        ),
    })),
    on(PlanningPokerActions.revealVotes, (state) => ({
        ...state,
        votesRevealed: true,
    })),
    on(PlanningPokerActions.resetVotes, (state) => ({
        ...state,
        votesRevealed: false,
        users: state.users.map((user) => ({ ...user, vote: null })),
    })),
    on(PlanningPokerActions.clearUsers, (state) => ({
        ...state,
        users: [],
        votesRevealed: false,
    })),
    on(PlanningPokerActions.setRoom, (state, { room }) => ({
        ...state,
        room,
    }))
);