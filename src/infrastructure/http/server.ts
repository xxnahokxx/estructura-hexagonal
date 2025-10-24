import Fastify from "fastify";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";
import { CreateUserUseCase } from "../../application/use-cases/create-user.usecase";
import { GetUserUseCase } from "../../application/use-cases/get-user.usecase";
import { ListUsersUseCase } from "../../application/use-cases/list-users.usecase";
import { UpdateUserUseCase } from "../../application/use-cases/update-user.usecase";
import { DeleteUserUseCase } from "../../application/use-cases/delete-user.usecase";
import { UserController } from "./controllers/user.controller";
import { userRoutes } from "./routes/user.routes";
export async function buildServer() {
    const fastify = Fastify({ logger: true });
    // --- Infra: repositorio concreto --
    const userRepo = new InMemoryUserRepository();
    // --- Application: instanciar use-cases inyectando los puertos --
    const createUserUC = new CreateUserUseCase(userRepo);
    const getUserUC = new GetUserUseCase(userRepo);
    const listUsersUC = new ListUsersUseCase(userRepo);
    const updateUserUC = new UpdateUserUseCase(userRepo);
    const deleteUserUC = new DeleteUserUseCase(userRepo);
    // --- Controller: agrupa los use-cases para exponerlos por HTTP --
    const userController = new UserController(
        createUserUC,
        getUserUC,
        listUsersUC,
        updateUserUC,
        deleteUserUC
    );
    // registrar controller en fastify para que las rutas lo puedan usar
    (fastify as any).userController = userController;
    // registrar rutas
    fastify.register(userRoutes);
    return fastify;
}
