import { Carta } from './../template/carta/carta.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export interface Carta{
  cartaface: string,
  cartaid: number,
  cartaverso: boolean
}

export class SrvjogoService {
  
  cartaobj:Carta;
  jogo:number;

  constructor() { }
}
