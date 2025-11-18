import { UserRepository } from "../../domain/repositories/user.repository";
export class DeleteUserUseCase {
    constructor(private userRepo: UserRepository) { }
    async execute(id: string): Promise<void> {
        const existing = await this.userRepo.findById(id);
        if (!existing) throw new Error("Usuario no encontrado");
        await this.userRepo.delete(id);
    }
}
