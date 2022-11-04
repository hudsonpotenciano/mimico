import { Jogador } from "@/entity/Jogador";
import { Partida } from "@/entity/Partida";
import { PontuacaoPartida } from "@/entity/PontuacaoPartida";

const getPartida = async () => {
  const pontuacao = new PontuacaoPartida(new Jogador("Hudson", 10, 1), 10);
  return Promise.resolve(new Partida(1, [pontuacao], new Date()));
};

export { getPartida };
