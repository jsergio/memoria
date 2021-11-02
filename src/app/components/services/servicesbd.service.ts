// import usrjson from '../../../assets/dados/usr.json';
import { Injectable } from '@angular/core';


export interface Usuario{
  usid: number,
  nome: string,
}


export interface Dados {
  id?: number,
  nome: string,
  nivel: number,
  tentativas: number,
  acertos: number,
  termino: boolean,
  dtini: number,
  dtfin: number
}



@Injectable({
  providedIn: 'root'
})
export class ServicesbdService {

  dados?:Dados={
    id: 1,
    nome: '',
    nivel: 1,
    tentativas: 0,
    acertos: 0,
    termino: false,
    dtini: 0,
    dtfin: 0 
   }

  banco:Dados[]=[]

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    
    if (this.storage) {
      if(this.storage.getItem(key)!==null){
        const tmp:any = this.storage.getItem(key)     
         return JSON.parse(tmp);
      }
      return null
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
