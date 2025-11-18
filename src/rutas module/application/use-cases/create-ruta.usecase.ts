import { Ruta } from "../../domain/entities/ruta";
import { RutaRepository } from "../../domain/repositories/ruta.repository";
import { CreateRutaDTO } from "../dtos/create-ruta.dto";


export class CreateRutaUseCase {

    constructor(
        private rutaRepo: RutaRepository
    ) {}

    async execute(createRutaDTO: CreateRutaDTO): Promise<Ruta> {
        const { id, conductor, placa, origen, destino } = createRutaDTO;

        const ruta = await this.rutaRepo.save({ id, conductor, placa, origen, destino });

        return ruta;
    }
}
