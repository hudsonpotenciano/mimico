export class Grupo {
    id: number;
    nome: string;
    jogadores: number[];

    constructor(id: number, nome: string, jogadores: number[]) {
        this.id = id;
        this.nome = nome
        this.jogadores = jogadores;
    }
}