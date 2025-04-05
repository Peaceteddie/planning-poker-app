import { createAction, props } from '@ngrx/store';
import { User } from './planning-poker.types';

export const addUser = createAction('[Planning Poker] Add User', props<User>());