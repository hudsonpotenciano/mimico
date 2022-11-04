export class Jogador {
  id: number;
  nome: string;
  pontuacao: number;

  constructor(nome: string, pontuacao: number, id = 0) {
    this.id = id;
    this.nome = nome;
    this.pontuacao = pontuacao;
  }
}
