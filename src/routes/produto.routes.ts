import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";

const produtoController = new ProdutoController();
const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selecionarProdutos);
produtoRoutes.post('/produtos', produtoController.criarProduto);
produtoRoutes.patch('/produtos', produtoController.editarProduto);
produtoRoutes.delete('/produtos', produtoController.deletarProduto);

export default produtoRoutes;