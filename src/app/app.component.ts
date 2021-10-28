import { Component, OnInit, NgModule } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { SrvjogoService } from './components/services/srvjogo.service';

export interface Model {
  id?:number,
  nome:string,
  nivel:number
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.command.html',
  styleUrls: ['app.command.css']
})

export class AppComponent implements OnInit {
  
  model:Model=
  {
    id:0,
    nome:'',
    nivel:1
  }
  
  escondido = true;
  
  title = 'Jogo Memoria';

  mostra(prm:any){
    this.escondido = true
    this.srv.nivel=prm.nivel-1
    this.srv.iniciar()
    this.escondido = false
    
    // console.log('OKKKKK')
    // console.log(prm)
    // console.log('aqui')
    // // let nome=form.name
  }
  constructor(public srv: SrvjogoService){}
 
  ngOnInit(): void {
  }
  
}
