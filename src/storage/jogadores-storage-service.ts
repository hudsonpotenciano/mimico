import { Preferences } from '@capacitor/preferences';
import { Jogador } from './types/jogador';

const key = "jogadores";

const setJogador = async (novoJogador: Jogador) => {

    const jogadores = await getJogadores();
    let lastId = jogadores.length > 0 ? jogadores[jogadores.length - 1].id : 0;

    novoJogador.id = lastId++;
    jogadores.push(novoJogador);

    await Preferences.set({
        key: key,
        value: JSON.stringify(jogadores),
    });
};

const getJogadores = async () => {
    const jogadoresString = (await Preferences.get({ key: key })).value ?? "[]";
    return JSON.parse(jogadoresString);
};

const getJogadorById = async (id: number) => {
    const jogadores = await getJogadores() as any[];
    return JSON.parse(jogadores.find(x => x.id == id));
};

export {
    setJogador, getJogadorById, getJogadores
}