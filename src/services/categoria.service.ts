import { CategoriaRepository } from "../repository/categoria.repository";
import { Categoria } from "../models/categoria.model";

export class CategoriaService {
  constructor(private _repository = new CategoriaRepository()) {}

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

  async criar(nome: string) {
    console.log(nome)
    const categoria = Categoria.criar(nome);
    return await this._repository.create(categoria);
  }

  async editar(id: number, nome: string, ativo: boolean) {
    const categoria = Categoria.editar(nome, ativo, id);
    return await this._repository.update(id, categoria);
  }

  async deletar(id:number) {
    return await this._repository.delete(id);
  }

}
