import { db } from "../database/connection.database";
import { ICategoria } from "../models/categoria.model";
import { ResultSetHeader } from "mysql2";

export class CategoriaRepository{
    async findAll():Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>(
            'SELECT * FROM categorias'
        )
        return rows;
    }

    async select(id: number):Promise<ICategoria[]> {
        const sql = 'SELECT * FROM categorias WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async selectName(nome:string):Promise<ICategoria[]> {
        const sql = 'SELECT * FROM categorias WHERE nome=?;';
        const values = [nome];
        const [rows] = await db.execute<ICategoria[]>(sql, values);
        console.log(rows)
        return rows;
    }

    async selectAsc():Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>('SELECT * FROM categorias ORDER BY nome ASC;');
        console.log(rows)
        return rows;
    }

    async create(dados: Omit<ICategoria, 'id'>):Promise<ResultSetHeader> {
        const sql='INSERT INTO categorias (nome, ativo) VALUES (?,?);';
        const values = [dados._nome, dados._ativo];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<ICategoria, 'id'>):Promise<ResultSetHeader> {
        const sql='UPDATE categorias SET nome =?, ativo=? WHERE id=?;';
        const values = [dados._nome, dados._ativo, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM categorias WHERE id=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}