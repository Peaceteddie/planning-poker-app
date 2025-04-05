import { createReducer, on } from '@ngrx/store';
import * as PlanningPokerActions from './planning-poker.actions';
import { PlanningPokerState } from './planning-poker.types';

export const planningPokerReducer = createReducer(new PlanningPokerState,
    on(PlanningPokerActions.addUser, (state, user) => ({
        ...state,
        users: [...state.users, user],
    })),
);