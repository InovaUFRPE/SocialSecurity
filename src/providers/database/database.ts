import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Ocurrence } from '../ocurrence-persistence/ocurrence-persistence';
import { CoordinatesProvider } from '../coordinates/coordinates';


@Injectable()
export class DatabaseProvider {

  constructor(
    private sqlite:      SQLite,
    private coordinates: CoordinatesProvider) {}


  public getDB() {
    return this.sqlite.create({
      name:     'database.db',
      location: 'default'
    });
  }


  public insertOcurrence(ocurrence: Ocurrence) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into ocorrencias (codigo_usuario, codigo_tipo_ocorrencia, titulo_ocorrencia, endereco_ocorrencia, posicao_ocorrencia, data_ocorrencia, hora_ocorrencia, boletim_ocorrencia) values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [ocurrence.getcodigo_usuario(), ocurrence.getcodigo_tipo_ocorrencia(), ocurrence.gettitulo_ocorrencia(), ocurrence.getendereco_ocorrencia(), ocurrence.getposicao_ocorrencia(), ocurrence.getdata_ocorrencia(), ocurrence.gethora_ocorrencia(), ocurrence.getboletim_ocorrencia() ? 1 : 0];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
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


  private initTypesOcurrences(db: SQLiteObject) {
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
  

  private initOcurrences() {
    const points = this.coordinates.getCoordinates();
    points.forEach(element => {
      let ocurrence = new Ocurrence;
      ocurrence.createOcurrence(element);
      this.insertOcurrence(ocurrence);
    });
  }


  private insertDefaultItems(db: SQLiteObject) {
    this.initTypesOcurrences(db);
    this.initOcurrences()
  }

}
