import { Jogador } from "../entity/Jogador";
import { orderById } from "../utils/utils";

const key = "jogadores";

const setJogador = async (novoJogador: Jogador) => {
  // if (novoJogador.nome.trim() == "") {
  //   throw new Error("Jogador inválido");
  // }
  // const jogadores = await getJogadores();
  // let lastId = jogadores.length > 0 ? jogadores[jogadores.length - 1].id : 0;
  // lastId++;
  // novoJogador.id = lastId;
  // novoJogador.nome = novoJogador.nome.trim();
  // if (
  //   jogadores.find(
  //     (j: any) => j.nome.toUpperCase() === novoJogador.nome.toUpperCase()
  //   )
  // ) {
  //   return Promise.reject("Esse jogador já existe");
  // } else {
  //   jogadores.push(novoJogador);
  //   await localStorage.setItem(key, JSON.stringify(jogadores));
  // }
};

const updateJogador = async (jogador: Jogador) => {
  // if (jogador.id == 0 || jogador.nome.trim() == "") {
  //   throw new Error("Jogador inválido");
  // }
  // let jogadores = await getJogadores();
  // jogadores = jogadores.filter((j) => j.id != jogador.id);
  // jogadores.push(jogador);
  // localStorage.setItem(key, JSON.stringify(jogadores));
};

const getJogadores = async () => {
  // const jogadoresString = localStorage.getItem(key) ?? "[]";
  // const jogadoresDb = JSON.parse(jogadoresString) as Jogador[];
  // return jogadoresDb.sort(orderById);
  return [new Jogador("Hudson", 0, 1), new Jogador("Gaby", 0, 2)];
};

const getJogadorById = async (id: number) => {
  // const jogadores = (await getJogadores()) as any[];
  // return JSON.parse(jogadores.find((x) => x.id == id));
  return new Jogador("ById", 0, id);
};

export { setJogador, getJogadorById, getJogadores, updateJogador };
