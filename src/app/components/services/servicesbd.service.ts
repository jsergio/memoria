import usrjson from '../../../assets/dados/usr.json';
import { Injectable } from '@angular/core';


export interface Usuario{
  usid: number,
  nome: string,
  senha: string,
  dtini: number
}

export interface Placar{
  usid: number,
  partida: number,
  acertos: number,
  tentativas: number,
  dtini: number,
  dttermino: number
}

@Injectable({
  providedIn: 'root'
})
export class ServicesbdService {

  placar?:Placar={
    usid: 1,
    partida: 0,
    acertos: 0,
    tentativas: 0,
    dtini: 0,
    dttermino: 0
  }
  usarray:Usuario[]=usrjson
  // usuario:Usuario={
  //   usid: 1,
  //   nome: 'Sergio',
  //   senha: 'sergio07',
  //   dtini: 1633465084821
  // }

  constructor() { }
}
