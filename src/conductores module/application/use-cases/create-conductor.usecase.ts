import { Conductor } from "../../domain/entities/conductor";
import { ConductorRepository } from "../../domain/repositories/conductor.repository";
import { CreateConductorDTO } from "../dtos/create-conductor.dto";




export class CreateConductorUseCase {
    constructor(
        private conductorRepo: ConductorRepository
    ) { }

    async execute(createConductorDTO: CreateConductorDTO): Promise<void>{
        const { nombre, placa, telefono, correo } = createConductorDTO;

        const existingConductor = await this.conductorRepo.findByPlaca(placa);
        if (existingConductor) {
            throw new Error(`Conductor with placa ${placa} already exists.`);
        }

        const id = Math.random().toString(36).substring(2, 15); // Generar un ID único simple

        const newConductor = new Conductor({
            id,
            nombre,
            placa,
            telefono,
            correo,
            availability: true
        });

        await this.conductorRepo.save(newConductor);
    }
}
