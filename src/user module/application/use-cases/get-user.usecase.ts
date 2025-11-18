import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
export class GetUserUseCase {
    constructor(private userRepo: UserRepository) { }
    async execute(id: string): Promise<User> {
        const u = await this.userRepo.findById(id);
        if (!u) throw new Error("Usuario no encontrado");
        return u;
    }
}
