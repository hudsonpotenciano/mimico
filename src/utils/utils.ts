import { Jogador } from "@/storage/types/jogador";

function orderById(a:Jogador, b:Jogador) {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

export {
    orderById
}