import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
export class ListUsersUseCase {
    constructor(private userRepo: UserRepository) { }
    async execute(): Promise<User[]> {
        return this.userRepo.list();
    }
}
