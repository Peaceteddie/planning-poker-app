export interface User {
    id: string;
    name: string;
    vote?: number;
}

export class PlanningPokerState {
    users: User[] = [];
}