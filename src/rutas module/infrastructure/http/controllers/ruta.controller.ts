import { FastifyReply, FastifyRequest } from "fastify";
import { CreateRutaUseCase } from "../../../application/use-cases/create-ruta.usecase";


export class RutaController {

    constructor(
        private createRuta: CreateRutaUseCase
    ) { }

    async save(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as any;
            const ruta = await this.createRuta.execute({
                id: body.id,
                conductor: body.conductor,
                placa: body.placa,
                origen: body.origen,
                destino: body.destino
            })
            return reply.code(201).send(ruta);
        } catch (err: any) {
            return reply.code(400).send({ message: err.message });
        }
    }
}
