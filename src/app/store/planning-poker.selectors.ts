import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanningPokerState } from './planning-poker.reducer';

export const selectPlanningPokerState = createFeatureSelector<PlanningPokerState>('planningPoker');

export const selectUsers = createSelector(
    selectPlanningPokerState,
    (state: PlanningPokerState) => state.users
);

export const selectVotesRevealed = createSelector(
    selectPlanningPokerState,
    (state: PlanningPokerState) => state.votesRevealed
);

export const selectUserById = (userId: string) => createSelector(
    selectPlanningPokerState,
    (state: PlanningPokerState) => state.users.find(user => user.id === userId)
);

export const selectAverageVote = createSelector(
    selectUsers,
    selectVotesRevealed,
    (users, votesRevealed) => {
        if (!votesRevealed || users.length === 0) {
            return null;
        }
        const validVotes = users
            .filter((user) => user.vote !== null)
            .map((user) => user.vote as number); // Type assertion, votes are numbers when revealed

        if (validVotes.length === 0) {
            return null;
        }

        const average = validVotes.reduce((sum, vote) => sum + vote, 0) / validVotes.length;
        return average;
    }
);