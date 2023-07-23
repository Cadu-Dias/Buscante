import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, filter, switchMap, debounceTime, distinctUntilChanged, catchError, throwError, EMPTY, of } from 'rxjs';
import { Item, Livro, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoDeBusca : FormControl = new FormControl();
  mensagemErro : string = '';
  livrosResultado! : LivrosResultado;
  constructor(private service : LivroService) {
  }
  
  livrosEncontrados$ : Observable<Livro[]>= this.campoDeBusca.valueChanges.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar((valorDigitado))),
    map(resultado => this.livrosResultado = resultado),
    map((resultado => resultado.items ?? [])),
    map((items) => {
      return this.livrosResultadoParaLivros(items)
    },),
    catchError((error) => {
      console.log(error)
      return throwError(() => this.mensagemErro = 'Ops algo de errado aconteceu')
    })
  )


  livrosResultadoParaLivros(items : Item[]) : LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

}
