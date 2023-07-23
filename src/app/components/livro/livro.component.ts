import { Component, Input, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/interfaces';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

  @Input()
  livro!: Livro;

  modalAberto: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
