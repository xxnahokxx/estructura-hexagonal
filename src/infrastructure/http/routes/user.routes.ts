import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
export async function userRoutes(fastify: FastifyInstance, opts: any) {
    const controller: UserController = (fastify as any).userController;
    fastify.post("/users", controller.create.bind(controller));
    fastify.get("/users", controller.list.bind(controller));
    fastify.get("/users/:id", controller.get.bind(controller));
    fastify.put("/users/:id", controller.update.bind(controller));
    fastify.delete("/users/:id", controller.delete.bind(controller));
}
