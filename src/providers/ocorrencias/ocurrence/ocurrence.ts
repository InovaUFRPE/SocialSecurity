import { Injectable } from '@angular/core';

@Injectable()
export class Ocurrence {
	private codigo_usuario: number;
	private codigo_tipo_ocorrencia: number;
	private titulo_ocorrencia: string;
	private endereco_ocorrencia: string;
	private posicao_ocorrencia: string;
	private data_ocorrencia: string;
	private hora_ocorrencia: string;
	private boletim_ocorrencia: boolean;


	public createOcurrence(element) {
		this.setboletim_ocorrencia(element.registrou_bo);
		this.setcodigo_usuario(element.codigo_usuario);
		this.setcodigo_tipo_ocorrencia(element.tipo_assalto_id);
		this.settitulo_ocorrencia(element.titulo);
		this.setendereco_ocorrencia(element.endereco);
		this.setposicao_ocorrencia(element.position);
		this.setdata_ocorrencia(element.data);
		this.sethora_ocorrencia(element.hora);
	}


	public getcodigo_usuario(): number {
		return this.codigo_usuario;
	}

	public setcodigo_usuario(value: number) {
		this.codigo_usuario = value;
	}

	public getcodigo_tipo_ocorrencia(): number {
		return this.codigo_tipo_ocorrencia;
	}

	public setcodigo_tipo_ocorrencia(value: number) {
		this.codigo_tipo_ocorrencia = value;
	}

	public gettitulo_ocorrencia(): string {
		return this.titulo_ocorrencia;
	}

	public settitulo_ocorrencia(value: string) {
		this.titulo_ocorrencia = value;
	}

	public getendereco_ocorrencia(): string {
		return this.endereco_ocorrencia;
	}

	public setendereco_ocorrencia(value: string) {
		this.endereco_ocorrencia = value;
	}

	public getposicao_ocorrencia(): string {
		return this.posicao_ocorrencia;
	}

	public setposicao_ocorrencia(value: string) {
		this.posicao_ocorrencia = value;
	}

	public getdata_ocorrencia(): string {
		return this.data_ocorrencia;
	}

	public setdata_ocorrencia(value: string) {
		this.data_ocorrencia = value;
	}

	public gethora_ocorrencia(): string {
		return this.hora_ocorrencia;
	}

	public sethora_ocorrencia(value: string) {
		this.hora_ocorrencia = value;
	}

	public getboletim_ocorrencia(): boolean {
		return this.boletim_ocorrencia;
	}

	public setboletim_ocorrencia(value: boolean) {
		this.boletim_ocorrencia = value;
	}

}