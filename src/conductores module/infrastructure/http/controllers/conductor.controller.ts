import { FastifyReply, FastifyRequest } from "fastify";
import { CreateConductorUseCase } from "../../../application/use-cases/create-conductor.usecase";
import { FindByPlacaUseCase } from "../../../application/use-cases/find-by-placa.usecase";



export class ConductorController {
    constructor(
        private createConductor: CreateConductorUseCase,
        private findByPlaca: FindByPlacaUseCase
    ) { }

    async save(req: FastifyRequest, reply: FastifyReply) {
        try {
            const body = req.body as any;
            const conductor = await this.createConductor.execute({
                nombre: body.nombre,
                placa: body.placa,
                telefono: body.telefono,
                correo: body.correo
            })
            return reply.code(201).send(conductor);
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message });
        }
    }

    async getByPlaca(req: FastifyRequest, reply: FastifyReply) {
        try {
            const placa = (req.params as any).placa;
            const conductor = await this.findByPlaca.execute(placa);
            return reply.send(conductor);
        } catch (error) {
            return reply.code(400).send({ message: (error as Error).message });
        }
    }
}
