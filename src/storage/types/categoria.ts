export class Categoria {
  descricao: string;
  key: string;
  palavras: string[];
  constructor(descricao: string, palavras: string[], key: string) {
    this.descricao = descricao;
    this.palavras = palavras;
    this.key = key;
  }
}
