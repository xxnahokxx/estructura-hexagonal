import { Pedido } from "../../domain/entities/pedido";
import { PedidosRepository } from "../../domain/repositories/pedidos.repositories";

export class InMemoryPedidoRepository implements PedidosRepository {
    private pedidos: Pedido[] = [];

    async save(pedido: Pedido): Promise<void> {
        const existingIndex = this.pedidos.findIndex(p => p.id === pedido.id);

        if (existingIndex >= 0) {
            this.pedidos[existingIndex] = pedido;
        } else {
            this.pedidos.push(pedido);
        }
    }

    async findById(id: string): Promise<Pedido | null> {
        const pedido = this.pedidos.find(p => p.id === id);
        return pedido || null;
    }

    async list(): Promise<Pedido[]> {
        return [...this.pedidos]; // Retorna una copia para evitar mutaciones externas
    }

    async update(pedido: Pedido): Promise<void> {
        const existingIndex = this.pedidos.findIndex(p => p.id === pedido.id);

        if (existingIndex >= 0) {
            // Actualizar timestamp
            const updatedPedido = new Pedido({
                ...pedido,
                updatedAt: new Date()
            });
            this.pedidos[existingIndex] = updatedPedido;
        } else {
            throw new Error(`Pedido con id ${pedido.id} no encontrado`);
        }
    }

    async delete(id: string): Promise<void> {
        const existingIndex = this.pedidos.findIndex(p => p.id === id);

        if (existingIndex >= 0) {
            this.pedidos.splice(existingIndex, 1);
        } else {
            throw new Error(`Pedido con id ${id} no encontrado`);
        }
    }

    // Métodos adicionales para testing y debugging
    async clear(): Promise<void> {
        this.pedidos = [];
    }

    async count(): Promise<number> {
        return this.pedidos.length;
    }

    async findByUserId(userId: string): Promise<Pedido[]> {
        return this.pedidos.filter(p => p.userId === userId);
    }

    async findByStatus(status: string): Promise<Pedido[]> {
        return this.pedidos.filter(p => p.status === status);
    }
}
