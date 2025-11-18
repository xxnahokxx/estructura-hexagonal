import { randomUUID } from "crypto";
import { Pedido } from "../../domain/entities/pedido";
import { PedidosRepository } from "../../domain/repositories/pedidos.repositories";
import { CreatePedidoDTO } from "../dtos/create-pedido.dto";



export class CreatePedidoUseCase {
    constructor(private pedidoRepo: PedidosRepository) { }
    async execute(input: CreatePedidoDTO): Promise<Pedido> {


        this.validateAddress(input.direction);

        const pedidoProps = {
            id: randomUUID(),
            product: input.product,
            quantity: input.quantity,
            price: input.price,
            userId: input.userId,
            status: "En espera",
            createdAt: new Date(),
            updatedAt: new Date(),
            typeProduct: input.typeProduct,
            direction: input.direction
        }

        const pedido = new Pedido(pedidoProps);

        await this.pedidoRepo.save(pedido);
        return pedido;
    }

    private validateAddress(address: string): void {
        if (!address || address.trim().length === 0) {
            throw new Error("La dirección es requerida");
        }

        if (address.trim().length < 10) {
            throw new Error("La dirección debe tener al menos 10 caracteres");
        }

        if (address.trim().length > 200) {
            throw new Error("La dirección no puede exceder 200 caracteres");
        }

        // Validar que contenga elementos básicos de una dirección
        const addressPattern = /^[a-zA-Z0-9\s\.,#-]+$/;
        if (!addressPattern.test(address)) {
            throw new Error("La dirección contiene caracteres inválidos");
        }

        // Validar que tenga al menos un número (número de casa/apartamento)
        const hasNumber = /\d/.test(address);
        if (!hasNumber) {
            throw new Error("La dirección debe incluir un número");
        }
    }
}
