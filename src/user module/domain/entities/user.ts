

export type UserId = string;
export class User {
    constructor(
        public id: UserId,
        public name: string,
        public email: string,
        public password: string,
    ) { }
}
