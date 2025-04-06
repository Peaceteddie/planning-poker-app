export class User {
    id: string;
    isHost: boolean = false;
    name: string;
    vote?: number;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
