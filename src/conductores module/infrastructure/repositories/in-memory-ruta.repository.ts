import { Conductor } from "../../domain/entities/conductor";




export class InMemoryConductorRepository {
    private conductores: Conductor[] = [];

    async save (conductor: Conductor): Promise<Conductor> {
        this.conductores.push(conductor);
        return conductor;
    }

    async list(): Promise<Conductor[]> {
        return this.conductores;
    }

    async update(conductor: Conductor): Promise<void> {
        const index = this.conductores.findIndex(c => c.id === conductor.id);
        if (index !== -1) {
            this.conductores[index] = conductor;
        }
    }
    async findByPlaca(placa: string): Promise<Conductor | null> {
        const conductor = this.conductores.find(c => c.placa === placa);
        return conductor || null;
    }

}
