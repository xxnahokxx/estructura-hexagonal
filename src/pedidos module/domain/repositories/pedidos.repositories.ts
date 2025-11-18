import { Pedido } from "../entities/pedido";

export interface PedidosRepository {
    save(pedido: Pedido): Promise<void>;
    findById(id: string): Promise<Pedido | null>;
    list(): Promise<Pedido[]>;
    update(pedido: Pedido): Promise<void>;
    delete(id: string): Promise<void>;
}
