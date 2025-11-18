import { LoginUserDTO } from "../dtos/login-user.dto";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { PasswordService } from "../../domain/services/password.service";
import { LoginResponseDTO } from "../dtos/login-response.dto";
import { TokenService } from "../../domain/services/token.service";

export class LoginUserUseCase {
    constructor(
        private userRepo: UserRepository,
        private passwordService: PasswordService,
        private tokenService: TokenService
    ) { }

    async execute(input: LoginUserDTO): Promise<LoginResponseDTO> {
        const email = input.email.toLowerCase().trim();
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new Error("Correo no registrado");
        }

        const isPasswordValid = await this.passwordService.compare(
            input.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta");
        }

        const tokenPayload = {
            userId: user.id,
            email: user.email,
            name: user.name
        };

        const token = this.tokenService.generateToken(tokenPayload);
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token,
            expiresIn: "24h"
        }

    }
}
