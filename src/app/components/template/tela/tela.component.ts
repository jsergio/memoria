import { SrvjogoService } from './../../services/srvjogo.service';
import { Component, OnInit } from '@angular/core';


export interface Carta {
  cartaface: string,
  cartaid: number,
  cartaverso: boolean
}


@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.css']
})

export class TelaComponent implements OnInit {

  telaarray: number[]=[1,2,3,4,5,6]
  cartaobjarray: Carta[]=[]

  constructor(private srv: SrvjogoService) {
    
  } 

  ngOnInit(): void {
    // const t:number=this.telaarray.length()
    // for(let i:number=0;i<t;i++){

    }
  }

// }
