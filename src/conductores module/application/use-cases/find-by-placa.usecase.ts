import { ConductorRepository } from "../../domain/repositories/conductor.repository";



export class FindByPlacaUseCase {
    constructor(
        private conductorRepo: ConductorRepository
    ) { }
    async execute(placa: string) {
        const conductor =  await this.conductorRepo.findByPlaca(placa);
        return conductor;
    }
}
