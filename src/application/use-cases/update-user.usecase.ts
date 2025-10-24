import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
export class UpdateUserUseCase {
    constructor(private userRepo: UserRepository) { }
    async execute(user: User): Promise<void> {
        const existing = await this.userRepo.findById(user.id);
        if (!existing) throw new Error("Usuario no encontrado");
        // ejemplo simple: validar email único si cambia
        if (existing.email !== user.email) {
            const byEmail = await this.userRepo.findByEmail(user.email);
            if (byEmail) throw new Error("Email en uso por otro usuario");
        }
        await this.userRepo.update(user);
    }
}
