import { Pedido } from "../../../pedidos module/domain/entities/pedido";
import { CreateRutaDTO } from "../../application/dtos/create-ruta.dto";
import { Ruta } from "../entities/ruta";



export interface RutaRepository {
    save(ruta: CreateRutaDTO): Promise<Ruta>;
    list(): Promise<Ruta[]>;
    update(pedido: Pedido): Promise<void>;
}
