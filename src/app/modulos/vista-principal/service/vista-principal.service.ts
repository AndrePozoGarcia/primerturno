import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, Input, Output } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrito } from 'src/app/interfaces/carrito.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
import { Item } from 'src/app/interfaces/item';
import { Promo } from 'src/app/interfaces/promo.interface';
const PROMOPATH = 'promo';
const EVENTOPATH = 'evento';
const SALEPATH = 'venta';
@Injectable({
  providedIn: 'root',
})
export class VistaPrincipalService {
  @Output() trigger: EventEmitter<any> = new EventEmitter();

  constructor(private firestore: Firestore) { }

  private _collections = collection(this.firestore, PROMOPATH);
  private _collectionsEvento = collection(this.firestore, EVENTOPATH);
  private _collectionsVenta = collection(this.firestore, SALEPATH);
  private carritoService: Carrito = {
    items: [],
    montoTotal: 0,
  };

  public getCarritoService(): Carrito {
    const storedData = this.getCarritoLocalStorage();
    if (storedData) {
      this.carritoService = JSON.parse(storedData);
    }
    return this.carritoService;
  }

  public setCarritoService(evento: Item): void {
    this.removeCarritoLocalStorage();

    const existingItem = this.carritoService.items.find((i) => i.id === evento.evento.id);

    if (existingItem) {
      existingItem.boletos += evento.evento.boletos;
      this.carritoService.montoTotal += evento.evento.boletos * existingItem.precio;
    } else {
      this.carritoService.items.push(evento.evento);
      this.carritoService.montoTotal += evento.evento.boletos * evento.evento.precio;
    }

    this.setCarritoLocalStorage(this.carritoService);
  }

  public deleteCarritoService(): void {
    this.carritoService.items = [];
    this.carritoService.montoTotal = 0;
    this.removeCarritoLocalStorage();
  }

  public getPromos() {
    return collectionData(this._collections, { idField: 'id' }) as Observable<Promo[]>;
  }

  public getEventos() {
    return collectionData(this._collectionsEvento, {
      idField: 'id',
    }) as Observable<Evento[]>;
  }

  public getEventoById(id: string): Observable<Evento | undefined> {
    const eventoDocRef = doc(this.firestore, `${EVENTOPATH}/${id}`);

    return new Observable<Evento | undefined>((observer) => {
      getDoc(eventoDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const eventoData = { id: docSnap.id, ...docSnap.data() } as Evento;
            observer.next(eventoData);
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  public getPromoById(id: string): Observable<Promo | undefined> {
    const promoDocRef = doc(this.firestore, `${PROMOPATH}/${id}`);

    return new Observable<Promo | undefined>((observer) => {
      getDoc(promoDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const promoData = docSnap.data() as Promo;
          observer.next(promoData);
        } else {
          observer.next(undefined);
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  public postCarrito(carrito: Item) {
    return addDoc(this._collectionsVenta, carrito).then(() => {
      this.removeCarritoLocalStorage();
    });
  }


  public setCarritoLocalStorage(carrito: Carrito): void {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  public getCarritoLocalStorage() {
    return localStorage.getItem('carrito');
  }

  public removeCarritoLocalStorage(): void {
    localStorage.removeItem('carrito');
  }
}
