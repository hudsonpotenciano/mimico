export class Jogador {
    id: number;
    nome: string;
    pontuacao: number;

    constructor(nome: string, pontuacao: number) {
        this.id = 0;
        this.nome = nome
        this.pontuacao = pontuacao;
    }
}