import { Base } from "./base.interface";
import { Evento } from "./evento.interface";

export interface Promo extends Evento {
    descuento: number;
    fechaInicio: string;
    fechaFin: string;
}

