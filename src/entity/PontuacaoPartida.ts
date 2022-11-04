import { Jogador } from "./Jogador";

export class PontuacaoPartida {
  Jogador: Jogador;
  pontuacao: number;

  constructor(jogador: Jogador, pontuacao: number) {
    this.Jogador = jogador;
    this.pontuacao = pontuacao;
  }
}
