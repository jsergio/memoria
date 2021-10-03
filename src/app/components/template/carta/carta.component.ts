import { SrvjogoService } from './../../services/srvjogo.service';
import { Component, OnInit, Input } from '@angular/core';

export interface Carta {
  cartaface: string,
  cartaid: number,
  cartaverso: boolean,
  cartaind:number,
  cartafixa: boolean
}

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})

export class CartaComponent implements OnInit {
        

  cartacapa: string = "assets/img/packmons/capa.png"
  cartamostra: string = ""

  @Input() cartalink!: string
  @Input() cartaobj!: Carta

  constructor(public srv: SrvjogoService) { }

  ngOnInit(): void {
  }
  
  trocastatuscarta(i:number=-1):void{
    if(i<0)
      this.cartaobj.cartaverso = !this.cartaobj.cartaverso
    else
      this.srv.cartaobjarray[i].cartaverso = !this.srv.cartaobjarray[i].cartaverso
  }


  checaacerto():void{
      return
    }
    
  onClick():void{
  
    if(this.cartaobj.cartafixa){
      console.log('Voltou')
    return
  }
  
  if(this.srv.jogo===1){
    this.trocastatuscarta()
    this.srv.cartaanterior = this.cartaobj.cartaind
    this.srv.jogo = 2
    return
  } 
  else{
    this.trocastatuscarta()
    let ind = this.srv.cartaanterior
    let cartaanteriorid = ind>=0 ? this.srv.cartaobjarray[this.srv.cartaanterior].cartaid: -1
    
    this.srv.jogo = 1
    
    if(this.cartaobj.cartaid != cartaanteriorid){

      setTimeout(() => {
          this.trocastatuscarta(this.srv.cartaanterior)
          this.trocastatuscarta()
        }, 1000)
      }
   else{
 
    this.cartaobj.cartafixa = true
    this.srv.cartaobjarray[this.srv.cartaanterior].cartafixa = true
  }
}
}
}
