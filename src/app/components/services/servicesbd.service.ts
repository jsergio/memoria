import { Injectable } from '@angular/core';


// export interface Usuario{
//   usid: number,
//   nome: string,
// }


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



@Injectable({
  providedIn: 'root'
})

export class ServicesbdService {

  dados:Dados =

  {
    id: 1,
    nome: '',
    nivel: 1,
    tentativas: 0,
    acertos: 0,
    termino: false,
    dtini: 0,
    dtfin: 0 
   }

  banco:Dados[]=[]

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    
    if (this.storage) {
      if(this.storage.getItem(key)!==null){
        const tmp:any = this.storage.getItem(key)     
         return JSON.parse(tmp);
      }
      return null
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

  perc(v: Dados):number{
    const n1:number=v.acertos
    const n2:number=v.tentativas
    return n2!=0 ? (n1*100)/n2 : 0
  }

  idmax(p:Dados[]):number{
    let result = 0

    if(p==null || p==[])
       result = 0
    else  {
    if(p.length<3){
      console.log('IDMAX AQUI',result)
      result = p.length-1
    }
    else {
     const fun = (r:number,v:Dados,i:number,a:Dados[]) => (v.id > a[r].id) ? i : r;
     result = p.reduce(fun,0)+1
    }
    }  
    console.log('IDMAX ',result)
    return result
  }

  pegadados():any{
    // this.remove('memoria')
    this.banco=this.get('memoria')
    if(this.banco && this.banco != null)
    {
      const imin=this.achamin(this.banco)
      console.log('IMIN = ',imin)
      console.log('PEGOU ',this.banco,'IDMAX',this.idmax(this.banco))
    } else{
      console.log('Banco Vazio',this.banco)
    }
  }
  
  achamin(p:Dados[]):number{
    console.log('P',p)
    let result = 0
    if(p.length===3)
    {
    if(this.perc(p[1])<this.perc(p[result]))
     result  = 1
    if(this.perc(p[2])<this.perc(p[result]))
        result  = 2  
    }
  //  return p.reduce((r, v, i, a) => this.perc(v) < this.perc(a[r]) ? r : i, 0);
  return result
  }

  excluiminimo():void{

    if(this.banco.length<3)
    {
      console.log('BANCO',this.banco.length)
      return
    }
    else {
          // let iminimo = (array : Dados[]) =>
          //     array.reduce((r, v, i, a) => this.perc(v) < this.perc(a[r]) ? r : i, -1);
          const imin = this.achamin(this.banco)
          console.log('Iminimo',imin)
          console.log('ANTES splice',this.banco)          
          this.banco.splice(imin,1)
          console.log('Depois splice',this.banco)
         }
    return
  }

  salvaarray():boolean{
    if(this.banco!=null){
      this.excluiminimo()
    } else{
      this.banco=[]
    }
    this.banco.push(this.dados);
    console.log('DADOS FINAIS',this.banco)
    console.log('BANCO GUARDADO',this.banco)
    // return false
    this.remove('memoria')   
    return this.set('memoria',this.banco)
  }
}