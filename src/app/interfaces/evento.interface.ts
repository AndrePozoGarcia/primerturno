import { Base } from "./base.interface";

export interface Evento extends Base {
    fecha: string;
    lugar: string;
    precio: number;
    imagen: string;
    boletos: number;
    categoria: string;
    descuento?: number;
    destacar?: boolean;
}
