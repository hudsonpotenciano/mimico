import firebase from "./mongodb.service";
import { Categoria } from "../entity/Categoria";
const key = "categorias";

const getCategoria = async (categoriaKey: string) => {
  // const fromStorage = localStorage.getItem(key);
  // let categorias = [];

  // if (!fromStorage) {
  //   categorias = await getTodasCategorias();
  // } else {
  //   categorias = JSON.parse(fromStorage);
  // }

  // return categorias.find((cat: Categoria) => cat.key == categoriaKey);

  return Promise.resolve(
    new Categoria("Animais", ["avangers", "Dog", "Rat"], "animais")
  );
};

const getTodasCategorias = async () => {
  // const categorias = await firebase.get(key);
  // const categoriasArray = Object.keys(categorias.data).map(function (key) {
  //   const categoria = categorias.data[key];
  //   categoria.key = key;
  //   return categoria;
  // });

  // localStorage.setItem(key, JSON.stringify(categoriasArray));

  // return categoriasArray as Categoria[];
  // //to-do definir cache para essa consulta

  return Promise.resolve([
    new Categoria("Animais", ["Cat", "Dog", "Mouse"], "animais"),
    new Categoria("Filmes", ["Frozen", "KungFu Panda", "ToyStory"], "filmes"),
  ]);
};

export { getCategoria, getTodasCategorias };
