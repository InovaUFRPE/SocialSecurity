import { Ocurrence } from '../ocurrence/ocurrence';


export class OcurrenceController {

	public insertOcurrence(ocurrence: Ocurrence) {
		db => {
				let sql = 'insert into ocorrencias (codigo_usuario, codigo_tipo_ocorrencia, titulo_ocorrencia, endereco_ocorrencia, posicao_ocorrencia, data_ocorrencia, hora_ocorrencia, boletim_ocorrencia) values (?, ?, ?, ?, ?, ?, ?, ?)';
				let data = [ocurrence.getcodigo_usuario(), ocurrence.getcodigo_tipo_ocorrencia(), ocurrence.gettitulo_ocorrencia(), ocurrence.getendereco_ocorrencia(), ocurrence.getposicao_ocorrencia(), ocurrence.getdata_ocorrencia(), ocurrence.gethora_ocorrencia(), ocurrence.getboletim_ocorrencia() ? 1 : 0];

				return db.executeSql(sql, data)
					.catch((e) => console.error(e));
		}
	}

}