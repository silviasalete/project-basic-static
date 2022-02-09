export interface Country {
    id: number
    sigla: string
    nome: string
    regiao: Regiao
  }
  
  export interface Regiao {
    id: number
    sigla: string
    nome: string
  }
  