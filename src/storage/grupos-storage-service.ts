import { Preferences } from '@capacitor/preferences';
import { Grupo } from './types/grupo';
import { Jogador } from './types/jogador';

const key = "grupos";

const setGrupo = async (novoGrupo: Grupo) => {

    const grupos = await getGrupos();
    let lastId = grupos.length > 0 ? grupos[grupos.length - 1].id : 0;

    novoGrupo.id = lastId++;
    grupos.push(novoGrupo);

    await Preferences.set({
        key: key,
        value: JSON.stringify(grupos),
    });
};

const getGrupos = async () => {
    const gruposString = (await Preferences.get({ key: key })).value ?? "[]";
    return JSON.parse(gruposString);
};

const getGrupoById = async (id: number) => {
    const jogadores = await getGrupos() as any[];
    return JSON.parse(jogadores.find(x => x.id == id));
};

export {
    setGrupo, getGrupoById, getGrupos
}