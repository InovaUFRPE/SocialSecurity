import { Http } from '@angular/http';
import { Ocurrence } from '../ocurrence/ocurrence';
import { OcurrenceType } from '../ocurrence-type/ocurrence-type';


export class OcurrenceController {

	private API_REQRES_URL = 'http://socialsecurity.herokuapp.com/api/';

	constructor(public http: Http) { }

	/*
	public insertOcurrence(ocurrence: Ocurrence) {
		db => {
				let sql = 'insert into ocorrencias (codigo_usuario, codigo_tipo_ocorrencia, titulo_ocorrencia, endereco_ocorrencia, posicao_ocorrencia, data_ocorrencia, hora_ocorrencia, boletim_ocorrencia) values (?, ?, ?, ?, ?, ?, ?, ?)';
				let data = [ocurrence.getcodigo_usuario(), ocurrence.getcodigo_tipo_ocorrencia(), ocurrence.gettitulo_ocorrencia(), ocurrence.getendereco_ocorrencia(), ocurrence.getposicao_ocorrencia(), ocurrence.getdata_ocorrencia(), ocurrence.gethora_ocorrencia(), ocurrence.getboletim_ocorrencia() ? 1 : 0];

				return db.executeSql(sql, data)
					.catch((e) => console.error(e));
		}
	}
	*/

	/* Ocorrências */

	insertOcurrence(ocurrence: any) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrences';
			this.http.post(url, ocurrence)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	getAllOcurrences() {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrences';
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	getOcurrence(codigo_ocorrencia: number) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrences/' + codigo_ocorrencia;
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	getOcurrencePerType(codigo_tipo_ocorrencia: number) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrences/' + codigo_tipo_ocorrencia;
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	/* Tipos de Ocorrências */

	getAllOcurrenceTypes(){
		return new Promise((resolve, reject) => {
		let url = this.API_REQRES_URL + 'ocurrence-types';
		this.http.get(url)
			.subscribe((result: any) => {
				resolve(result.json())
			},
			(error) => {
				reject(error.json())
			});
		});
	}

	getOcurrenceType(codigo_tipo_ocorrencia: number) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrence-types/' + codigo_tipo_ocorrencia;
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}



}



