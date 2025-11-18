


interface PedidoProps {
    id: string;
    product: string;
    quantity: number;
    price: number;
    userId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    typeProduct: string;
    direction: string;
}

export class Pedido {
    public id: string;
    public product: string;
    public quantity: number;
    public price: number;
    public userId: string;
    public status: string;
    public createdAt: Date;
    public updatedAt: Date;
    public typeProduct: string;
    public direction: string;

    constructor(props: PedidoProps) {
        this.id = props.id;
        this.product = props.product;
        this.quantity = props.quantity;
        this.price = props.price;
        this.userId = props.userId;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.typeProduct = props.typeProduct;
        this.direction = props.direction;
    }
}
