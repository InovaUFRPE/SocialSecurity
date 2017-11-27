import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CoordinatesProvider } from '../ocorrencias/coordinates/coordinates';
import { Ocurrence } from '../ocorrencias/ocurrence/ocurrence';


@Injectable()
export class DatabaseProvider {

  constructor(
    private sqlite: SQLite,
    private coordinates: CoordinatesProvider) { }

  public getDB() {
    return this.sqlite.create({
      name: 'database.db',
      location: 'default'
    });
  }


 

  public createDatabase() {
    return this.getDB()
      .then((db) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão (Função para inserir os itens)
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }


  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS usuarios(codigo_usuario INTEGER primary key AUTOINCREMENT NOT NULL, nome_usuario VARCHAR(100), email_usuario VARCHAR(150), sennha_usuario VARCHAR(32), sexo_usuario CHAR)'],
      ['CREATE TABLE IF NOT EXISTS tipos_de_ocorrencia (codigo_tipo_ocorrencia INTEGER primary key AUTOINCREMENT NOT NULL, descricao_ocorrencia TEXT)'],
      ['CREATE TABLE IF NOT EXISTS ocorrencias ( codigo_ocorrencia INTEGER primary key AUTOINCREMENT NOT NULL, codigo_usuario INTEGER,  codigo_tipo_ocorrencia INTEGER, titulo_ocorrencia TEXT, endereco_ocorrencia TEXT, posicao_ocorrencia TEXT, data_ocorrencia TEXT, hora_ocorrencia TEXT, boletim_ocorrencia INTEGER, FOREIGN KEY(codigo_usuario) REFERENCES usuarios(codigo_usuario), FOREIGN KEY(codigo_tipo_ocorrencia) REFERENCES tipos_de_ocorrencia(codigo_tipo_ocorrencia))'],
      ['CREATE TABLE IF NOT EXISTS sessao (codigo_sessao INTEGER primary key AUTOINCREMENT NOT NULL, codigo_usuario INTEGER, data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, isLogged INTEGER, FOREIGN KEY(codigo_usuario) REFERENCES usuarios(codigo_usuario))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }


  private initTypesOcurrences() {
   
  }


  private initOcurrences() {
    const points = this.coordinates.getCoordinates();
    points.forEach(element => {
      let ocurrence: Ocurrence;
      ocurrence.createOcurrence(element);
      //this.insertOcurrence(ocurrence);
    });
  }


  private insertDefaultItems(db: SQLiteObject) {
    //this.initTypesOcurrences(db);
    //this.initOcurrences()
  }

}
