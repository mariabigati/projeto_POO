import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
  constructor(private _repository = new ProdutoRepository()) {}

  async selecionarTodos() {
    return await this._repository.findAll();
  }

  async selecionarUm(id: number) {
    console.log(id)
    return await this._repository.select(id);
  }

  async selecionarNome(nome: string) {
    console.log(nome)
    return await this._repository.selectName(nome);
  }

  async selecionarAsc() {
    return await this._repository.selectAsc();
  }

  async criar(nome: string, valor: number, idCategoria: number) {
    console.log(nome)
    console.log(`ID categ: ${idCategoria}`)
    const produto = Produto.criar(nome, valor, idCategoria);
    return await this._repository.create(produto);
  }

  async editar(id: number, nome: string, valor: number, idCategoria: number) {
    const produto = Produto.editar(nome, valor, idCategoria, id);
    return await this._repository.update(id, produto);
  }

  async deletar(id:number) {
    return await this._repository.delete(id);
  }

}
