import { Component, OnInit } from '@angular/core';
import { SrvjogoService } from '../../services/srvjogo.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  // dtinicio:Date=new Date()
  // id?:any

  constructor(public srv:SrvjogoService) {
//     let dataatual = new Date()
//     console.log(dataatual)
//     let dataParametro = Date.now();
// console.log(dataParametro);
   }

  ngOnInit(): void {
    this.srv.startTimer()
    // this.cronometro()
  }

  // cronometro():void{
  //   this.dtinicio.getSeconds()
  //   this.id = setInterval(()=>this.dtinicio=new Date(),1000)
  // }
  ngOnDestroy(){
    if (this.srv.interval) {
      this.srv.pauseTimer()
      // clearInterval(this.interval);
    }
  }
}
