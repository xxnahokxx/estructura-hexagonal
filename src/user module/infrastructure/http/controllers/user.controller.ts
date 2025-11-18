import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../../application/use-cases/create-user.usecase";
import { GetUserUseCase } from "../../../application/use-cases/get-user.usecase";
import { ListUsersUseCase } from "../../../application/use-cases/list-users.usecase";
import { UpdateUserUseCase } from "../../../application/use-cases/update-user.usecase";
import { DeleteUserUseCase } from "../../../application/use-cases/delete-user.usecase";
import { LoginUserUseCase } from "../../../application/use-cases/login-user.usecase";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
export class UserController {
    constructor(
        private createUser: CreateUserUseCase,
        private loginUser: LoginUserUseCase,
        private getUser: GetUserUseCase,
        private listUsers: ListUsersUseCase,
        private updateUser: UpdateUserUseCase,
        private deleteUser: DeleteUserUseCase
    ) { }
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as any;
            const user = await this.createUser.execute({
                name: body.name, email:
                    body.email, password: body.password
            });
            return reply.code(201).send(user);
        } catch (err: any) {
            return reply.code(400).send({ message: err.message });
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as any;
            const loginResponse = await this.loginUser.execute({
                email: body.email,
                password: body.password
            })



            return reply.code(200).send({
                message: "Login exitoso",
                data: loginResponse
            });
        } catch (err: any) {
            return reply.code(401).send({message: err.message})
        }
    }

    async get(req: FastifyRequest, reply: FastifyReply) {
        try {
            const id = (req.params as any).id;
            const user = await this.getUser.execute(id);
            return reply.send(user);
        } catch (err: any) {
            return reply.code(404).send({ message: err.message });
        }
    }
    async list(req: AuthenticatedRequest, reply: FastifyReply) {
        const users = await this.listUsers.execute();
        return reply.send(users);
    }
    async update(req: FastifyRequest, reply: FastifyReply) {
        try {
            const id = (req.params as any).id;
            const body = req.body as any;
            await this.updateUser.execute({
                id, name: body.name, email:
                    body.email, password: body.password
            });
            return reply.code(204).send();
        } catch (err: any) {
            return reply.code(400).send({ message: err.message });
        }
    }
    async delete(req: FastifyRequest, reply: FastifyReply) {
        try {
            const id = (req.params as any).id;
            await this.deleteUser.execute(id);
            return reply.code(204).send();
        } catch (err: any) {
            return reply.code(404).send({ message: err.message });
        }
    }
}
