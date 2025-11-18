// los casos de uso son la aplicación de la lógica de negocio, orquestando las operaciones necesarias para cumplir con un requerimiento específico, como crear un usuario. Pero esto no debe incluir detalles de infraestructura o presentación. solo el paso a paso, el pide o solicita un uso pero no sabe como funciona internamente.

import { CreateUserDTO } from "../dtos/create-user.dto";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { randomUUID } from "crypto";
import { PasswordService } from "../../domain/services/password.service";
export class CreateUserUseCase {
    constructor(
        private userRepo: UserRepository,
        private passwordService: PasswordService
    ) { }
    async execute(input: CreateUserDTO): Promise<User> {
        const email = input.email.toLowerCase().trim();
        const existing = await this.userRepo.findByEmail(email);
        if (existing) throw new Error("El email ya está registrado");
        const hashedPassword = await this.passwordService.hash(input.password);
        const user = new User(randomUUID(), input.name.trim(), email, hashedPassword);
        await this.userRepo.save(user);
        return user;
    }
}



