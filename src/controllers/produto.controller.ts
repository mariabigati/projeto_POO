import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";

export class ProdutoController {
  constructor(private _service = new ProdutoService()) {}

  selecionarProdutos = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      const nome = String(req.query.nome);
      const ordem = String(req.query.ordem);

      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      }

      if (id) {
        const produtos = await this._service.selecionarUm(id);
        if (produtos.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse ID." });
        }
        console.log(produtos);
        res.status(200).json({ produtos });
      }

      if (nome) {
        const produtos = await this._service.selecionarNome(nome);
        if (produtos.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum registro encontrado com esse nome." });
        }
        console.log(produtos);
        res.status(200).json({ produtos });
      }

      if (ordem) {
        if (ordem.toLowerCase() != "crescente") {
          res.status(200).json({ message: "Ordem desconhecida." });
        }
        const produtos = await this._service.selecionarAsc();
        if (produtos.length < 1) {
          res.status(200).json({ message: "Nenhum registro encontrado." });
        }
        console.log(produtos);
        res.status(200).json({ produtos });
      }

      const produtos = await this._service.selecionarTodos();
      if (produtos.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      res.status(200).json({ produtos });
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

  criarProduto = async (req: Request, res: Response) => {
    try {
      const { nome, valor } = req.body;
      const idCategoria = Number(req.query.idCategoria);
      const resultado = await this._service.criar(nome, valor, idCategoria);
      res
        .status(201)
        .json({ message: "Produto criado com sucesso!", resultado: resultado });
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

  editarProduto = async (req: Request, res: Response) => {
    try {
      const { nome, valor } = req.body;
      const idCategoria = Number(req.query.idCategoria);
      const id = Number(req.query.id);

      const produtoSelecionado = await this._service.selecionarUm(id);
      if (produtoSelecionado.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum produto encontrado com este ID." });
      }

      const resultado = await this._service.editar(
        id,
        nome,
        valor,
        idCategoria,
      );
      res.status(200).json({ resultado });
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
  deletarProduto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      console.log(id);
      const produtoSelecionado = await this._service.selecionarUm(id);
      if (produtoSelecionado.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const resultado = await this._service.deletar(id);
      console.log(resultado);
      res.status(200).json({message: "Produto deletado com sucesso!", resultado: resultado });
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
