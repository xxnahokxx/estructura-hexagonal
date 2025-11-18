import { FastifyInstance } from "fastify";
import { PedidoController } from "../controllers/pedido.controller";


export async function pedidoRoutes(fastify: FastifyInstance, opts: any) {
    const controller: PedidoController = (fastify as any).pedidoController ;
    fastify.post("/pedidos/create", controller.save.bind(controller));

}
