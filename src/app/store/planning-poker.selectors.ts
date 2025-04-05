import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanningPokerState } from './planning-poker.types';

export const selectPlanningPokerState = createFeatureSelector<PlanningPokerState>('planningPoker');

export const selectUsers = createSelector(
    selectPlanningPokerState,
    (state: PlanningPokerState) => state.users
);