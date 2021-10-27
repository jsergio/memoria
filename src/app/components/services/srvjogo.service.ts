import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

export interface Niveis{
  nivel:number,
  colunas:number,
  figuras:number
}

export interface Carta {
  cartaface: string,
  cartaid: number,
  cartaverso: boolean,
  cartaind: number,
  cartafixa: boolean
}


@Injectable({
  providedIn: 'root'
})


export class SrvjogoService implements OnInit {

  jogo: number = 1;
  nivel:number= 2;

  telaarray: number[] = []
  cartaobjarray: Carta[] = []
  cartacapa: String = "assets/img/packmons/capa.png"
  cartaanterior: number = 0

  niveis:Niveis[]=[
  {
    nivel:1,
    colunas:4,
    figuras:8
  },
  {
    nivel:2,
    colunas:5,
    figuras:10
  },
  {
    nivel:3,
    colunas:6,
    figuras:12
  },
 ]
 
  constructor() {
    // console.log(this.cartaobjarray)
  }
 
  iniciar(){
    this.telaarray = this.criaarray(this.niveis[this.nivel].figuras)
    this.telaarray = this.duplica(this.telaarray)
    this.telaarray = this.shuffledArr(this.telaarray)
    // console.log(this.telaarray)
    this.criacartaobjarray()
  }

  ngOnInit(): void {
  }

  criaarray(tam: number = 0): number[] {
    let temp: number[] = []
    for (let i = 1; i <= tam; i++)
      temp.push(i)
    return temp;
  }

  criacartaobjarray() {
    this.cartaobjarray = []
    for (let i in this.telaarray) {
      this.cartaobjarray.push({
        cartaface: `assets/img/packmons/${this.telaarray[i]}.png`,
        cartaid: this.telaarray[i],
        cartaverso: true,
        cartaind: +i,
        cartafixa: false
      }
      )
    }
  }

  duplica(arr: number[]): number[] {

    let newArr = arr.slice()

    newArr = newArr.concat(newArr)

    return newArr
  }

  shuffledArr(arr: number[]) {
    const newArr = arr.slice()
    let rand: number = 0;
    for (let i = newArr.length - 1; i > 0; i--) {
      rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
  };
}
