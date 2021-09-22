import { Component, OnInit } from '@angular/core';

export interface Carta {
  cartaface: string,
  cartaid: number,
  cartaverso: boolean
}

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})

export class CartaComponent implements OnInit {
        
  cartaobj: Carta = {
    cartaface : "assets/img/packmons/1.png",
    cartaid : 1,
    cartaverso : true
  }
  // cartamostra = "assets/img/packmons/1.png"
  // cartaid: number=1;
  // cartalnk:string = "assets/img/packmons/1.png"
  // cartalnk:string = "../../../../assets/img/packmons/1.png"
  // cartacapa: string="assets/img/packmons/capa.png";
  // cartaface: number=1;

  constructor() { }

  ngOnInit(): void {
    // let aa = {
    //   cartaid: number,
    //   frenteimg: string,
    //   versoimg: string,
    //   face: number
    // }
    
    // this.cartaid = 1;
    // this.car.frenteimg = "../../../../assets/img/packmons/1.png";
    // this.cartaface = 1;
// this.cartaobj = aa
  }
  onClick(){
    // alert(this.cartaobj.cartaface)
   
   if(this.cartaobj.cartaverso){
      this.cartaobj.cartaface = "assets/img/packmons/capa.png"
      this.cartaobj.cartaverso = false
    }
    else{
      this.cartaobj.cartaface = "assets/img/packmons/1.png"
      this.cartaobj.cartaverso = true
    }
     
    // alert(this.cartaobj.cartaface)
    // this.cartamostra = this.cartacapa;
  }
}
