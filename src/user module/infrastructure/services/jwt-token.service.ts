import jwt from "jsonwebtoken";
import { TokenService } from "../../domain/services/token.service";

export class JwtTokenService implements TokenService {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor(secret: string = "your-secret-key", expiresIn: string = "24h") {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    generateToken(payload: any): string {
        return jwt.sign(
            payload,
            this.secret,
            {
                expiresIn: this.expiresIn,
                issuer: "your-app-name"
            } as jwt.SignOptions // Tipado explícito
        );
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new Error("Token inválido");
        }
    }
}
