import { randomUUID } from "crypto";
import { Pedido } from "../../../pedidos module/domain/entities/pedido";
import { CreateRutaDTO } from "../../application/dtos/create-ruta.dto";
import { Ruta } from "../../domain/entities/ruta";
import { RutaRepository } from "../../domain/repositories/ruta.repository";

export class InMemoryRutaRepository implements RutaRepository {
    private rutas: Ruta[] = [];

    async save(rutaDTO: CreateRutaDTO): Promise<Ruta> {
        const rutaProps = {
            id: rutaDTO.id || randomUUID(),
            capacidad: 4, // Capacidad por defecto
            disponibilidad: true, // Disponible por defecto
            origen: rutaDTO.origen,
            destino: rutaDTO.destino,
            conductor: rutaDTO.conductor,
            placa: rutaDTO.placa
        };

        const ruta = new Ruta(rutaProps);

        const existingIndex = this.rutas.findIndex(r => r.id === ruta.id);
        if (existingIndex >= 0) {
            this.rutas[existingIndex] = ruta;
        } else {
            this.rutas.push(ruta);
        }

        return ruta;
    }

    async list(): Promise<Ruta[]> {
        return [...this.rutas]; // Retorna una copia para evitar mutaciones externas
    }

    async update(pedido: Pedido): Promise<void> {
        // Esta implementación parece incorrecta en la interfaz,
        // debería ser update(ruta: Ruta) en lugar de update(pedido: Pedido)
        // Por ahora implementamos una función vacía hasta que se corrija la interfaz
        throw new Error("Método update necesita ser corregido en la interfaz RutaRepository");
    }

    // Métodos adicionales útiles para el repositorio en memoria
    async findById(id: string): Promise<Ruta | null> {
        const ruta = this.rutas.find(r => r.id === id);
        return ruta || null;
    }

    async findByPlaca(placa: string): Promise<Ruta | null> {
        const ruta = this.rutas.find(r => r.placa === placa);
        return ruta || null;
    }

    async findByOrigen(origen: string): Promise<Ruta[]> {
        return this.rutas.filter(r => r.origen.toLowerCase().includes(origen.toLowerCase()));
    }

    async findByDestino(destino: string): Promise<Ruta[]> {
        return this.rutas.filter(r => r.destino.toLowerCase().includes(destino.toLowerCase()));
    }

    async findAvailableRoutes(): Promise<Ruta[]> {
        return this.rutas.filter(r => r.disponibilidad === true);
    }

    async updateDisponibilidad(id: string, disponibilidad: boolean): Promise<void> {
        const existingIndex = this.rutas.findIndex(r => r.id === id);

        if (existingIndex >= 0) {
            this.rutas[existingIndex].disponibilidad = disponibilidad;
        } else {
            throw new Error(`Ruta con id ${id} no encontrada`);
        }
    }

    async updateCapacidad(id: string, nuevaCapacidad: number): Promise<void> {
        if (nuevaCapacidad < 1) {
            throw new Error("La capacidad debe ser mayor a 0");
        }

        const existingIndex = this.rutas.findIndex(r => r.id === id);

        if (existingIndex >= 0) {
            this.rutas[existingIndex].capacidad = nuevaCapacidad;
        } else {
            throw new Error(`Ruta con id ${id} no encontrada`);
        }
    }

    async delete(id: string): Promise<void> {
        const existingIndex = this.rutas.findIndex(r => r.id === id);

        if (existingIndex >= 0) {
            this.rutas.splice(existingIndex, 1);
        } else {
            throw new Error(`Ruta con id ${id} no encontrada`);
        }
    }

    // Métodos para testing y debugging
    async clear(): Promise<void> {
        this.rutas = [];
    }

    async count(): Promise<number> {
        return this.rutas.length;
    }
}
