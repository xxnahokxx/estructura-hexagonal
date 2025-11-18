

interface RutasProps {
    id: string;
    capacidad: number;
    disponibilidad: boolean;
    origen: string;
    destino: string;
    conductor: string;
    placa: string;
}

export class Ruta {
    public id: string;
    public capacidad: number;
    public disponibilidad: boolean;
    public origen: string;
    public destino: string;
    public conductor: string;
    public placa: string;


    constructor(props: RutasProps) {
        this.id = props.id;
        this.capacidad = props.capacidad;
        this.disponibilidad = props.disponibilidad;
        this.origen = props.origen;
        this.destino = props.destino;
        this.conductor = props.conductor;
        this.placa = props.placa;
    }

}
