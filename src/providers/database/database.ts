import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

/**
* Cria um banco caso não exista ou pega um banco existente com o nome no parametro
*/

  public getDB() {
    return this.sqlite.create({
      name: 'database.db',
      location: 'default'});
  }


  /*
  * Cria a estrutura inicial do banco de dados
  */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão (Função para inserir os itens)
        this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS usuarios (codigo_usuario INTEGER primary key AUTOINCREMENT NOT NULL, nome_usuario VARCHAR(100), email_usuario VARCHAR(150), sennha_usuario VARCHAR(32), sexo_usuario CHAR)'],
      ['CREATE TABLE IF NOT EXISTS tipos_de_ocorrencia (codigo_tipo_ocorrencia INTEGER primary key AUTOINCREMENT NOT NULL, descricao_ocorrencia TEXT)'],
      ['CREATE TABLE IF NOT EXISTS ocorrencias (codigo_ocorrencia INTEGER primary key AUTOINCREMENT NOT NULL, codigo_usuario INTEGER, codigo_tipo_ocorrencia INTEGER, titulo_ocorrencia TEXT, endereco_ocorrencia TEXT, posicao_ocorrencia TEXT, data_ocorrencia DATE, hora_ocorrencia DATETIME, boletim_ocorrencia INTEGER, FOREIGN KEY(codigo_usuario) REFERENCES usuarios(codigo_usuario), FOREIGN KEY(codigo_tipo_ocorrencia) REFERENCES tipos_de_ocorrencia(codigo_tipo_ocorrencia))']
      ['CREATE TABLE IF NOT EXISTS sessao (codigo_sessao INTEGER primary key AUTOINCREMENT NOT NULL, codigo_usuario INTEGER, data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, isLogged INTEGER, FOREIGN KEY(codigo_usuario) REFERENCES usuarios(codigo_usuario))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  /*
  * Incluindo os dados padrões
  * @param db
  */

 
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(codigo_tipo_ocorrencia) as qtd from tipos_de_ocorrencia', {})
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {

          // Criando as tabelas
          db.sqlBatch([
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Furto']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Roubo']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Assalto a grupo']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Sequestro Relâmpago']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Arrombamento Veicular']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Arrombamento Domiciliar']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Arrombamento Loja Comercial']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Saidinha Bancária']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Roubo de Veículo']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Arrastão']],
            ['insert into tipos_de_ocorrencia (descricao_ocorrencia) values (?)', ['Tentativa de Assalto']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e));

        }
      })
      .catch(e => console.error('Erro ao consultar os tipos_de_ocorrencia', e));
    }

}
