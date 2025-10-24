import { User, UserId } from "../entities/user";
export interface UserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: UserId): Promise<User | null>;
    list(): Promise<User[]>;
    update(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
}
