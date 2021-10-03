// import { Carta } from './../template/tela/tela.component';
import { OnInit } from '@angular/core';
// import { CartaModel } from './srvjogo.service';
// import { Carta } from './../template/carta/carta.component';
import { Injectable } from '@angular/core';
// import { from } from 'rxjs';

export interface Carta {
  cartaface: string,
  cartaid: number,
  cartaverso: boolean,
  cartaind:number,
  cartafixa: boolean
}


@Injectable({
  providedIn: 'root'
})


export class SrvjogoService implements OnInit {

  

  // cartaobj:Carta={
  //   cartaface : "assets/img/packmons/1.png",
  //   cartaid : 1,
  //   cartaverso : true
  // };


  jogo: number=1;

  telaarray: number[]=[]
  cartaobjarray: Carta[]=[]
  cartacapa : String= "assets/img/packmons/capa.png" 
  cartaanterior: number=0

  constructor() {
    this.telaarray = this.criaarray(8) 
    this.telaarray = this.duplica(this.telaarray)
    this.telaarray = this.shuffledArr(this.telaarray)
    console.log(this.telaarray)
    this.criacartaobjarray()
    console.log(this.cartaobjarray)
   }
 
  ngOnInit():void{
  }

  criaarray(tam:number=0):number[]{
    let temp: number[] = []
    for(let i=1;i<=tam;i++)
       temp.push(i)
     return temp;  
  }
  
  criacartaobjarray(){
    for (let i in this.telaarray) {
      this.cartaobjarray.push({
        cartaface : `assets/img/packmons/${this.telaarray[i]}.png`,
        cartaid : this.telaarray[i],
        cartaverso : true,
        cartaind: +i,
        cartafixa: false
        }
       )    
      //  console.log(this.cartaobjarray)
    }
  }

  duplica(arr:number[]):number[]{
  
    let newArr = arr.slice()
  
    newArr=newArr.concat(newArr)
  
    return newArr
  }

  shuffledArr(arr: number[]){
    const newArr = arr.slice()
    let rand: number=0;
    for (let i = newArr.length - 1; i > 0; i--) {
        rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

}
