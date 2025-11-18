import { Conductor } from "../entities/conductor";



export interface ConductorRepository {
    save(conductor: Conductor): Promise<Conductor>; // ☑️
    list(): Promise<Conductor[]>;
    update(conductor: Conductor): Promise<void>;
    findByPlaca(placa: string): Promise<Conductor | null>;
}
