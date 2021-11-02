// import { Dados } from './servicesbd.service';
// import { ParseTreeResult } from '@angular/compiler';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
// import { Console } from 'console';
import { ServicesbdService } from './servicesbd.service';

export interface Model {
  id?:number,
  nome:string,
  nivel:number
}

export interface Model {
  id?: number,
  nome: string,
  nivel: number
}


export interface Niveis {
  nivel: number,
  colunas: number,
  figuras: number
}

export interface Dados {
  id?: number,
  nome: string,
  nivel: number,
  tentativas: number,
  acertos: number,
  termino: boolean,
  dtini: number,
  dtfin: number
}

export interface Carta {
  cartaface: string,
  cartaid: number,
  cartaverso: boolean,
  cartaind: number,
  cartafixa: boolean
}


@Injectable({
  providedIn: 'root'
})


export class SrvjogoService implements OnInit {


  model:Model={
    nome:'',
    nivel:0
  }

  jogo: number = 1;
  nivel: number = 1;
  dados: Dados = {
  id: 0,
  nome: '',
  tentativas: 0,
  acertos: 0,
  nivel: 0,
  termino: false,
  dtini: Date.now(),
  dtfin: Date.now()
  }

  telaarray: number[] = []
  cartaobjarray: Carta[] = []
  cartacapa: String = "assets/img/packmons/capa.png"
  cartaanterior: number = -1

  telas = {
    tela1: false,
    tela2: true,
    tela3: true,
    telafinal:false
  }

  niveis: Niveis[] = [
    {
      nivel: 1,
      colunas: 4,
      figuras: 8
    },
    {
      nivel: 2,
      colunas: 5,
      figuras: 10
    },
    {
      nivel: 3,
      colunas: 6,
      figuras: 12
    },
    {
      nivel: 4,
      colunas: 6,
      figuras: 15
    },    
    {
      nivel: 5,
      colunas: 6,
      figuras: 18
    },    
  ]
  time: number = 0;
  strtime:string='000'
  interval?:any;

  constructor(public srvdb:ServicesbdService) {
    // console.log(this.cartaobjarray)
  }

  iniciar(model: Model):void {
    this.telaarray = this.criaarray(this.niveis[this.nivel].figuras)
    this.telaarray = this.duplica(this.telaarray)
    this.telaarray = this.shuffledArr(this.telaarray)
    // console.log(this.telaarray)
    this.criacartaobjarray()
    this.dados.nome = model.nome
    this.dados.tentativas = 0
    this.dados.nivel = model.nivel
    this.dados.acertos = 0
    this.dados.termino = false
    this.dados.dtini = Date.now()
    this.dados.dtfin = Date.now()
    this.telas.tela1 = true
    this.telas.tela2 = false
    this.telas.tela3 = false
    this.telas.telafinal = false
    this.time=0
    
    if(this.srvdb.banco=this.srvdb.get('jogomemoria')){
      this.dados.id= this.srvdb.banco.length
      console.log('Pegou Banco: ',this.srvdb.banco)
      console.log('Dados Novos',this.dados)
    // console.log('Telas',this.telas)
    }
    return
  }
  
  reiniciar(){
    this.model.nome=''
    this.model.nivel=0
  this.srvdb.banco.push(this.dados)
  if(this.srvdb.set('jogomemoria',this.srvdb.banco))
      console.log('GRAVOU DADOS')
  this.telas.tela1 = false
  this.telas.tela2 = true
  this.telas.tela3 = true
  this.telas.telafinal = false
  this.dados.nome=''
  this.strtime=''
  this.time=0
  }

  ngOnInit(): void {
  }

  criaarray(tam: number = 0): number[] {
    let temp: number[] = []
    for (let i = 1; i <= tam; i++)
      temp.push(i)
    return temp;
  }

  criacartaobjarray() {
    this.cartaobjarray = []
    for (let i in this.telaarray) {
      this.cartaobjarray.push({
        cartaface: `assets/img/packmons/${this.telaarray[i]}.png`,
        cartaid: this.telaarray[i],
        cartaverso: true,
        cartaind: +i,
        cartafixa: false
      }
      )
    }
  }

  duplica(arr: number[]): number[] {

    let newArr = arr.slice()

    newArr = newArr.concat(newArr)

    return newArr
  }

  shuffledArr(arr: number[]) {
    const newArr = arr.slice()
    let rand: number = 0;
    for (let i = newArr.length - 1; i > 0; i--) {
      rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
  }

  getMonthName(dt:Date):string{
    const meses:string[]=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEC']
    return meses[dt.getMonth()]
  }

  formatadata(dt: number): string {
    const data = new Date(dt)
    return `${this.pad(data.getDate())} ${this.getMonthName(data)} ${data.getFullYear()} ${this.pad(data.getHours())}:${this.pad(data.getMinutes())}`
  }

  startTimer() {
    this.interval = setInterval(() => {
        if(this.time === 0) {
            this.time++;
        } else {
            this.time++;
        }
        this.strtime=this.formataTimer()
    },1000)
}

pauseTimer() {
    clearInterval(this.interval);
}

pad(tmp:number):string{
  const result:string='00'+tmp
  return result.slice(-2)
}

formataTimer():string{
  // let result:string=''
  const hh = Math.floor(this.time/3600)
  const rr = this.time%3600
  const mm = Math.floor(rr/60)
  const ss = rr%60

  if(hh>0)
  return `${this.pad(hh)}:${this.pad(mm)}:${this.pad(ss)} horas`
  else
  return `${this.pad(mm)}:${this.pad(ss)} minutos`
}
}
