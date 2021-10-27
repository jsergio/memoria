import { Niveis, SrvjogoService } from './../../services/srvjogo.service';
import { Component, OnInit } from '@angular/core';
import { ServicesbdService } from './../../services/servicesbd.service'

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

  // nivelatual:number=   this.jogoatual = this.srv.niveis[this.srv.nivel]   this.jogoatual = this.srv.niveis[this.srv.nivel]
  jogoatual:Niveis = this.srv.niveis[this.srv.nivel]

  constructor(public srv: SrvjogoService,
   public srvdb: ServicesbdService) {

  }

  ngOnInit(): void {

    this.jogoatual = this.srv.niveis[this.srv.nivel]
    // this.srv.iniciar()

   console.log(this.srvdb.usarray)
  }
}