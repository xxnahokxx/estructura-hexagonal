
interface ConductorProps {
    id: string;
    nombre: string;
    placa: string;
    telefono: string;
    correo: string;
    availability: boolean;
}



export class Conductor {
    public id: string;
    public nombre: string;
    public placa: string;
    public telefono: string;
    public correo: string;

    constructor(props: ConductorProps) {
        this.id = props.id;
        this.nombre = props.nombre;
        this.placa = props.placa;
        this.telefono = props.telefono;
        this.correo = props.correo;

    }
}


