import { FastifyInstance } from "fastify";
import { RutaController } from "../controllers/ruta.controller";



export async function rutaRoutes(fastify: FastifyInstance, opts: any) {
    const controller: RutaController = (fastify as any).rutaController;

    fastify.post("/rutas", controller.save.bind(controller));
    
}
