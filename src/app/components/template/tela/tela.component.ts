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

  constructor(public srv: SrvjogoService) {

  }

  ngOnInit(): void {

  }
}