import { ServicesbdService } from './components/services/servicesbd.service';
import { Component, OnInit, NgModule } from '@angular/core';
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

    this.srv.telas.tela1 = false
    this.srv.telas.tela2 = true
    this.srv.telas.tela3 = true
    this.srv.telas.telafinal = false
    // this.escondido = false
    
    // console.log('OKKKKK')
    // console.log(prm)
    // console.log('aqui')
    // // let nome=form.name
  }
  constructor(public srv: SrvjogoService,
              public srvdb:ServicesbdService){}
 
  ngOnInit(): void {
  }

  terminar(){
    

  this.srvdb.dados=this.srv.dados
  this.srvdb.salvaarray();
  console.log('Termino SRDB.DADOS',this.srvdb.dados)
  this.srv.reiniciar()
}

  continuar(){
    this.srv.reiniciar()
  }
}
