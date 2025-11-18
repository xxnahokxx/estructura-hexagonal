

import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
export class InMemoryUserRepository implements UserRepository {
    private items: Map<string, User> = new Map();
    async save(user: User): Promise<void> {
        this.items.set(user.id, user);
    }
    async findByEmail(email: string): Promise<User | null> {
        for (const u of this.items.values()) if (u.email === email) return u;
        return null;
    }
    async findById(id: string): Promise<User | null> {
        return this.items.get(id) ?? null;
    }
    async list(): Promise<User[]> {
        return Array.from(this.items.values());
    }
    async update(user: User): Promise<void> {
        if (!this.items.has(user.id)) throw new Error("No existe usuario");
        this.items.set(user.id, user);
    }
    async delete(id: string): Promise<void> {
        this.items.delete(id);
    }
}
