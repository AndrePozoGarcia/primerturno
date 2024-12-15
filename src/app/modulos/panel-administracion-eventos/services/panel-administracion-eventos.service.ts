import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento.interface';
import { ModalFormComponent } from '../components/modal-form/modal-form.component';
import { addDoc, collection, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
const PROMOPATH = 'promo';
const EVENTOPATH = 'evento';
const SALEPATH = 'venta';

@Injectable({
  providedIn: 'root'
})

export class PanelAdministracionEventosService {

  private form: Subject<ModalFormComponent> = new Subject();
  private modalInfo: Subject<any> = new Subject();

  constructor(
    private firestore: Firestore
  ) { }
  private _collections = collection(this.firestore, PROMOPATH);
  private _collectionsEvento = collection(this.firestore, EVENTOPATH);
  private _collectionsVenta = collection(this.firestore, SALEPATH);

  public getForm(): Observable<ModalFormComponent> {
    return this.form.asObservable();
  }

  public setForm(data: ModalFormComponent) {
    this.form.next(data);
  }

  public getModalInfo(): Observable<any> {
    return this.modalInfo.asObservable();
  }
  public setModalInfo(data: any) {
    this.modalInfo.next(data);
  }

  public eliminarEvento(id: string): Observable<any> {
    const docRef = doc(this._collectionsEvento, id);
    return from(deleteDoc(docRef));
  }

  public crearEvento(evento: Evento): Observable<any> {
    if (!evento.imagen) {
      evento.imagen = 'https://www.graspengineering.com/wp-content/themes/merlin/images/default-slider-image.png';
    }

    return from(addDoc(this._collectionsEvento, evento));
  }

  public editar(id: string, data: Evento): Observable<void> {
    const docRef = doc(this.firestore, `${this._collectionsEvento}/${id}`);
    return from(setDoc(docRef, data, { merge: true }));
  }

  public editarEvento(evento: Evento): Observable<void> {
    const docRef = doc(this._collectionsEvento, evento.id);
    return from(setDoc(docRef, evento));
  }

}
