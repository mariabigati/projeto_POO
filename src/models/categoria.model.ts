import { RowDataPacket } from "mysql2";
export interface ICategoria extends RowDataPacket {
  id?: number;
  nome?: string;
  ativo?: boolean;
  dataCad?: Date;
}

export class Categoria {
  private _id?: number;
  private _nome: string = "";
  private _ativo: boolean;
  private _dataCad?: Date;

  constructor(nome: string, ativo: boolean, id?: number) {
    this.Nome = nome;
    this._ativo = ativo ?? true;
    this._id = id;
  }

  //GETTERS

  public get Id(): number | undefined {
    return this._id;
  }

  public get Nome(): string {
    return this._nome;
  }

  public get DataCad(): Date | undefined {
    return this._dataCad;
  }

  public get Ativo(): boolean {
    return this._ativo;
  }

  //SETTERS

  public set Nome(value: string){
    this._validarNome(value);
    this._nome = value;
  }

  public set Id(value: number) {
    this._id = value;
  }

  //DP => Factory
  public static criar(nome:string): Categoria {
    return new Categoria(nome, true);
  }

  public static editar(nome: string, ativo:boolean, id:number ) {
    return new Categoria(nome, ativo, id);
  }

  private _validarNome(value:string): void {
    if(!value || value.trim().length < 3) {
        throw new Error('Nome da categoria deve ter ao menos 3 caracteres');
    }

    if(value.trim().length > 45) {
        throw new Error('Nome da categoria deve ter no máximo 45 caracteres.')
    }
  }


}

