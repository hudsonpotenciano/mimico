import { Categoria } from './types/categoria';

const setCategoria = async (novaCategoria: Categoria) => {

    const categorias = await getCategorias();
    let lastId = categorias.length > 0 ? categorias[categorias.length - 1].id : 0;

    novaCategoria.id = lastId++;
    categorias.push(novaCategoria);

    await localStorage.setItem('categorias', JSON.stringify(categorias));
};

const getCategorias = async () => {
    const caregoriasString = localStorage.getItem('categorias') ?? "[]";
    return JSON.parse(caregoriasString);
};

const getCategoriaById = async (id: number) => {
    const categorias = await getCategorias() as any[];
    return JSON.parse(categorias.find(c => c.id == id));
};

export {
    setCategoria, getCategoriaById, getCategorias
}