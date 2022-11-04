import { PontuacaoPartida } from "./PontuacaoPartida";

export class Partida {
  Id: number;
  Pontuacao: PontuacaoPartida[];
  Data: Date;

  constructor(
    id: number,
    pontuacao: PontuacaoPartida[],
    data: Date = new Date()
  ) {
    this.Id = id;
    this.Pontuacao = pontuacao;
    this.Data = data;
  }
}
