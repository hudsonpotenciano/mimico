export class Categoria {
    id: number;
    nome: string;
    palavras: string[];
    /**
     *
     */
    constructor(id: number, nome: string, palavras: string[]) {
        this.id = id;
        this.nome = nome
        this.palavras = palavras;
    }
}