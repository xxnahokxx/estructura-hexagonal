import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePedidoUseCase } from "../../../application/use-cases/create-pedido.usecase";



export class PedidoController {
    constructor(
        private createPedido: CreatePedidoUseCase,
    ) { }
    async save(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as any;
            const pedido = await this.createPedido.execute({
                product: body.product,
                quantity: body.quantity,
                price: body.price,
                userId: body.userId,
                status: body.status,
                typeProduct: body.typeProduct
            })
            return reply.code(201).send(pedido);
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message });
        }
    }
}
