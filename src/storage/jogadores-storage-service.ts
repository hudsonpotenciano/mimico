import { Jogador } from './types/jogador';

const key = "jogadores";

const setJogador = async (novoJogador: Jogador) => {

    const jogadores = await getJogadores();
    let lastId = jogadores.length > 0 ? jogadores[jogadores.length - 1].id : 0;
    lastId++
    novoJogador.id = lastId;
    novoJogador.nome = novoJogador.nome.trim();
    if (jogadores.find((j: any) => j.nome.toUpperCase() === novoJogador.nome.toUpperCase())) {
        return Promise.reject("Esse jogador já existe");
    } else {
        jogadores.push(novoJogador);
        await localStorage.setItem(key, JSON.stringify(jogadores));
    }
};

const getJogadores = async () => {
    const jogadoresString = localStorage.getItem(key) ?? "[]";
    return JSON.parse(jogadoresString);
};

const getJogadorById = async (id: number) => {
    const jogadores = await getJogadores() as any[];
    return JSON.parse(jogadores.find(x => x.id == id));
};

export {
    setJogador, getJogadorById, getJogadores
}