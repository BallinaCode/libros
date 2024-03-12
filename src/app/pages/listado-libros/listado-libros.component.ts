import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-listado-libros',
  templateUrl: './listado-libros.component.html',
  styleUrl: './listado-libros.component.css'
})

export class ListadoLibrosComponent implements OnInit {

  //propiedades
  libros: Libro[] = [];
  libro = new Libro();

  //constructor
  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.libroService.getLibros().subscribe(data => {
      this.libros = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Libro,
          id: doc.payload.doc.id
        };
      });
    });
  }

  //método para insertar un nuevo libro
  insertarLibro() {
    this.libroService.createLibro(this.libro);
    this.libro = new Libro();
  }

  //método para seleccionar un libro y modificarlo o eliminarlo
  selectLibro(libroSeleccionado: Libro) {
    this.libro = libroSeleccionado;
  }

  //método para modificar un libro
  updateLibro() {
    this.libroService.updateLibro(this.libro);
    this.libro = new Libro();
  }

  //método para eliminar un libro
  deleteLibro(id: string) {
    this.libroService.deleteLibro(id);
    this.libro = new Libro();
  }

}
