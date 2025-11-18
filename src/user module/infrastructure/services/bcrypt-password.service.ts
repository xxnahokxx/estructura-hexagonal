import { PasswordService } from "../../domain/services/password.service";
import * as bcrypt from "bcrypt";

export class BcryptPasswordService implements PasswordService {
    private readonly saltRounds = 12;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
