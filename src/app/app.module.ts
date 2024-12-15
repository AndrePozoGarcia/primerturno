import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ButtonModule } from 'primeng/button';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './layout/cabecera/cabecera.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './componentes/modal/modal.component';
import { RegisstroComponent } from './modulos/regisstro/regisstro.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, RegisstroComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ButtonModule,
    HeaderComponent,
    ModalComponent,
    BrowserAnimationsModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'eventos-angular',
        appId: '1:750442299905:web:bf746dc169d67c0aea7600',
        storageBucket: 'eventos-angular.firebasestorage.app',
        apiKey: 'AIzaSyAbu6Y8Dn9V4iRBAsl1Py8o1pH3-KPSJ-s',
        authDomain: 'eventos-angular.firebaseapp.com',
        messagingSenderId: '750442299905',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}