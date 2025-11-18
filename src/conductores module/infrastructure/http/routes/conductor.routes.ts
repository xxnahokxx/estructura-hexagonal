import { FastifyInstance } from "fastify";


export async function conductorRoutes(fastify: FastifyInstance, opts: any) {
    const controller = (fastify as any).conductorController;

    fastify.post("/conductor/new", controller.save.bind(controller));
    fastify.get("/conductor/:placa", controller.getByPlaca.bind(controller));
}
