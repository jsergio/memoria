import { SrvjogoService } from './../../services/srvjogo.service';
import { Component, OnInit } from '@angular/core';


export interface Carta {
  cartaface: string,
  cartaid: number,
  cartaverso: boolean,
  cartaind: number,
  cartafixa: boolean
}


@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.css']
})

export class TelaComponent implements OnInit {

  // telaarray: number[]=[]
  // cartaobjarray: Carta[]=[]
  // cartacapa : String= "assets/img/packmons/capa.png" 

  constructor(public srv: SrvjogoService) {

  }

  // criaarray(tam:number=0):number[]{
  //   let temp: number[] = []
  //   for(let i=1;i<=tam;i++)
  //      temp.push(i)
  //    return temp;  
  // }

  // criacartaobjarray(){
  //   for (let i in this.telaarray) {
  //     this.cartaobjarray.push({
  //       cartaface : `assets/img/packmons/${this.telaarray[i]}.png`,
  //       cartaid : +i,
  //       cartaverso : true          
  //       }
  //      )    
  //   }
  // }
  ngOnInit(): void {

  }

  // onClick(i:any){

  //   if(this.cartaobjarray[i].cartaverso){
  //     this.cartaobjarray[i].cartaface = "assets/img/packmons/capa.png"
  //     this.cartaobjarray[i].cartaverso = false
  //   }
  //   else{
  //     this.cartaobjarray[i].cartaface = "assets/img/packmons/1.png"
  //     this.cartaobjarray[i].cartaverso = true
  //   }       
  // }
}