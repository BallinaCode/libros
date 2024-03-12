import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Libro } from '../models/libro';


@Injectable({
  providedIn: 'root'
})

export class LibroService {

  constructor(private firestore: AngularFirestore) { }

  // método que permite obtener todos los documentos de la colección
  getLibros() {
    return this.firestore.collection('libros').snapshotChanges();
  }

  //método para insertar un método nuevo en la colección
  createLibro(nuevoLibro: Libro) {
    return this.firestore.collection('libros').add(Object.assign({}, nuevoLibro));
  }

  //métdo para actualizar un documento existente
  updateLibro(libro: Libro) {
    this.firestore.doc('libros/' + libro.id).update(libro);
  }

  //método para eliminar un documento
  deleteLibro(libroId: string) {
    this.firestore.doc('libros/' + libroId).delete();
  }
}
