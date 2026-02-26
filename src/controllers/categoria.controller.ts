import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

export class CategoriaController {
  constructor(private _service = new CategoriaService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      const nome = String(req.query.nome);
      const ordem = String(req.query.ordem);

      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      }

      if (id) {
        const categorias = await this._service.selecionarUm(id);
        if (categorias.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse ID." });
        }
        console.log(categorias);
        res.status(200).json({ categorias });
      }

      if (nome) {
        const categorias = await this._service.selecionarNome(nome);
        if (categorias.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse nome." });
        }
        console.log(categorias);
        res.status(200).json({ categorias });
      }

      if (ordem) {
        if (ordem.toLowerCase() != "crescente") {
          res.status(200).json({ message: "Ordem desconhecida." });
        }
        const categorias = await this._service.selecionarAsc();
        if (categorias.length < 1) {
          res.status(200).json({ message: "Nenhum registro encontrado." });
        }
        console.log(categorias);
        res.status(200).json({ categorias });
      }

      const categorias = await this._service.selecionarTodos();
      if (categorias.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      res.status(200).json({ categorias });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  criar = async (req: Request, res: Response) => {
    try {
      const { nome } = req.body;
      const novaCategoria = await this._service.criar(nome);
      res.status(201).json({ novaCategoria });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  editar = async (req: Request, res: Response) => {
    try {
      const { nome, ativo } = req.body;
      const id = Number(req.query.id);
      const alterado = await this._service.editar(id, nome, ativo);
      res.status(200).json({ alterado });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      console.log(id);
      const buscaItem = await this._service.selecionarUm(id);
      if (buscaItem.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const deletado = await this._service.deletar(id);
      console.log(deletado);
      res.status(200).json({ deletado });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };
}
