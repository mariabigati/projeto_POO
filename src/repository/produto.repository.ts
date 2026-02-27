import { db } from "../database/connection.database";
import { IProduto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2";

export class ProdutoRepository{
    async findAll():Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos'
        )
        return rows;
    }

    async select(id: number):Promise<IProduto[]> {
        const sql = 'SELECT * FROM produtos WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async selectName(nome:string):Promise<IProduto[]> {
        const sql = 'SELECT * FROM produtos WHERE nomeProd=?;';
        const values = [nome];
        const [rows] = await db.execute<IProduto[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async selectAsc():Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>('SELECT * FROM produtos ORDER BY nomeProd ASC;');
        console.log(rows)
        return rows;
    }

    async create(dados: Omit<IProduto, 'id'>):Promise<ResultSetHeader> {
        const sql='INSERT INTO produtos (nomeProd, valor, idCategoriaFK) VALUES (?,?,?);';
        const values = [dados._nomeProd, dados._valor, dados._idCategoria];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<IProduto, 'id'>):Promise<ResultSetHeader> {
        const sql='UPDATE produtos SET nomeProd =?, valor=?, idCategoriaFK=? WHERE id=?;';
        const values = [dados._nomeProd, dados._valor, dados._idCategoria, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM produtos WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}