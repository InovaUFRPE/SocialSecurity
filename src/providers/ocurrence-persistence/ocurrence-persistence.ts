import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Injectable()
export class OcurrencePersistenceProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(ocurrence: Ocurrence) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into ocorrencias (codigo_usuario, codigo_tipo_ocorrencia, titulo_ocorrencia, endereco_ocorrencia, posicao_ocorrencia, data_ocorrencia, hora_ocorrencia, boletim_ocorrencia) values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [ocurrence.codigo_usuario, ocurrence.codigo_tipo_ocorrencia, ocurrence.titulo_ocorrencia, ocurrence.endereco_ocorrencia, ocurrence.posicao_ocorrencia, ocurrence.data_ocorrencia, ocurrence.hora_ocorrencia, ocurrence.boletim_ocorrencia ? 1 : 0 ];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(codigo_ocorrencia: number){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from ocorrencias where codigo_ocorrencia = ?';
        let data = [codigo_ocorrencia];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let ocurrence = new Ocurrence();
              ocurrence.codigo_ocorrencia = item.codigo_ocorrencia;
              ocurrence.codigo_usuario = item.codigo_usuario;
              ocurrence.codigo_tipo_ocorrencia = item.codigo_tipo_ocorrencia;
              ocurrence.titulo_ocorrencia = item.titulo_ocorrencia;
              ocurrence.endereco_ocorrencia = item.endereco_ocorrencia;
              ocurrence.posicao_ocorrencia = item.posicao_ocorrencia;
              ocurrence.data_ocorrencia = item.data_ocorrencia;
              ocurrence.hora_ocorrencia = item.hora_ocorrencia;
              ocurrence.boletim_ocorrencia = item.boletim_ocorrencia;
            }

            return null;

          })
          .catch((e) => console.error(e));
      })

      .catch((e) => console.error(e));
  }
  
}

export class Ocurrence {
  codigo_ocorrencia: number;
  codigo_usuario: number;
  codigo_tipo_ocorrencia: number;
  titulo_ocorrencia: string;
  endereco_ocorrencia: string;
  posicao_ocorrencia: string;
  data_ocorrencia: Date;
  hora_ocorrencia: DateTime;
  boletim_ocorrencia: boolean;
}