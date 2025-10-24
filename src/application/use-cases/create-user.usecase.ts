import { CreateUserDTO } from "../dtos/create-user.dto";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { randomUUID } from "crypto";
export class CreateUserUseCase {
    constructor(private userRepo: UserRepository) { }
    async execute(input: CreateUserDTO): Promise<User> {
        const email = input.email.toLowerCase().trim();
        const existing = await this.userRepo.findByEmail(email);
        if (existing) throw new Error("El email ya está registrado");
        const user = new User(randomUUID(), input.name.trim(), email);
        await this.userRepo.save(user);
        return user;
    }
}
