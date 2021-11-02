import { Component, OnInit, NgModule } from '@angular/core';
// import { exit } from 'process';
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
  
  sele:boolean=false
  model:Model=
  {
    id:0,
    nome:'',
    nivel:1
  }
  
  // escondido = true;
  

  title = 'Jogo Memoria';
  
  valida(){
   this.sele=true
  }
  mostra(prm:any){
    // this.escondido = true
    this.srv.nivel=prm.nivel-1
    this.srv.iniciar(this.model)
    // this.escondido = false
    
    // console.log('OKKKKK')
    // console.log(prm)
    // console.log('aqui')
    // // let nome=form.name
  }
  constructor(public srv: SrvjogoService){}
 
  ngOnInit(): void {
  }

  terminar(){
    
  //  exit()
  // this.srv.telas.tela1=false
  // this.srv.telas.tela2=true
  // this.srv.telas.tela3=true
  // this.srv.telas.telafinal=false
  this.srv.reiniciar()
}

  continuar(){
    this.srv.reiniciar()
  }
}
