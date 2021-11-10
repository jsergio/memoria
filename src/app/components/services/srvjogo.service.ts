import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ServicesbdService } from './servicesbd.service';

export interface Model {
  id?: number,
  nome: string,
  nivel: number
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
  id: number,
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


  model: Model = {
    nome: '',
    nivel: 0
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
  cartacapa: string = "assets/img/packmons/cartac1.png"
  cartaanterior: number = -1

  telas = {
    tela1: true,
    tela2: false,
    tela3: false,
    telafinal: false
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
      figuras: 18
    },
    {
      nivel: 5,
      colunas: 7,
      figuras: 21
    },
  ]
  time: number = 0;
  strtime: string = '000'
  interval?: any;

  constructor(public srvdb: ServicesbdService) {
    // console.log(this.cartaobjarray)
  }
   iniciatela(){
    this.telas.tela1 = true
    this.telas.tela2 = false
    this.telas.tela3 = false
    this.telas.telafinal = false
    return
   }


  iniciar(model: Model): void {

    // this.srvdb.clear()

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


    this.time = 0
    console.log('PEGADADOS')
    if(this.srvdb.pegadados()!==null){
      console.log('DADOS INICIAIS 0',this.dados)
    if(this.srvdb.banco && this.srvdb.banco.length>0)
     {
         console.log('IDMAX',this.srvdb.idmax(this.srvdb.banco))
        // const inovo:number = this.srvdb.banco.length - 1
        // const idnovo:number=this.srvdb.banco[inovo].id+1
        this.dados.id = this.srvdb.idmax(this.srvdb.banco)+1
        console.log('DADOS INICIAIS 1',this.dados)
      } else {
      this.dados.id=0
      console.log('DADOS INICIAIS 2',this.dados)
    }
  }
    // if(this.srvdb.pegadados()){
    //   this.dados.id= this.srvdb.banco.length
    //   console.log('Pegou Banco: ',this.srvdb.banco)
    //   console.log('Dados Novos',this.dados)
    // // console.log('Telas',this.telas)
    // }
    this.iniciatela()
    if(!this.interval)
        this.startTimer()
    return
  }

  reiniciar():void {
    // this.model.nome = ''
    // this.model.nivel = 0

    // this.srvdb.banco.push(this.dados)
    // if (this.srvdb.salvaarray())
    //   console.log('GRAVOU DADOS')
    this.iniciatela()

    // this.dados.nome = ''
    this.strtime = ''
    this.time = 0
    if(this.interval)
      {
        this.pauseTimer()
        this.interval=null
        this.startTimer()
      }
    return
  }

  ngOnInit(): void {
  }

  criaarray(tam: number = 0): number[] {
    // let temp: number[] = []
    let tmp:number[]=[]

    for(let i=1;i<32;i++){
      tmp.push(i)
    }

    tmp=this.shuffledArr(tmp)

    // for (let i = 1; i <= tam; i++)
    //   temp.push(tmp[i])
    return tmp.slice(0,tam);
  }

  criacartaobjarray() {
    this.cartaobjarray = []
    for (let i in this.telaarray) {
      this.cartaobjarray.push({
        cartaface: `assets/img/packmons/${this.telaarray[i]}.png`,
        cartaid: this.telaarray[i],
        cartaverso: true,
        cartaind: +i, //indice da carta no array telaarray
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

  getMonthName(dt: Date): string {
    const meses: string[] = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEC']
    return meses[dt.getMonth()]
  }

  formatadata(dt: number): string {
    const data = new Date(dt)
    return `${this.pad2(data.getDate())} ${this.getMonthName(data)} ${data.getFullYear()} ${this.pad2(data.getHours())}:${this.pad2(data.getMinutes())}`
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.strtime = this.formataTimer()
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  pad2(tmp: number): string {
    const result: string = '00' + tmp
    return result.slice(-2)
  }

  formataTimer(): string {
    // let result:string=''
    const hh = Math.floor(this.time / 3600)
    const rr = this.time % 3600
    const mm = Math.floor(rr / 60)
    const ss = rr % 60

    if (hh > 0)
      return `${this.pad2(hh)}:${this.pad2(mm)}:${this.pad2(ss)} horas`
    else
      return `${this.pad2(mm)}:${this.pad2(ss)} minutos`
  }
}
