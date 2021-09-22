// import { CartaModel } from './srvjogo.service';
// import { Carta } from './../template/carta/carta.component';
import { Injectable } from '@angular/core';

export interface CartaModel{
  cartaface: string,
  cartaid: number,
  cartaverso: boolean
}


@Injectable({
  providedIn: 'root'
})


export class SrvjogoService {
  
  cartaobj:CartaModel={
    cartaface : "assets/img/packmons/1.png",
    cartaid : 1,
    cartaverso : true
  };

  jogo:number=0;

  constructor() { }
}
