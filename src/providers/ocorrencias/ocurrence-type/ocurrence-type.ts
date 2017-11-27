import { Injectable } from '@angular/core';

@Injectable()
export class OcurrenceType {
    private codigo_tipo_ocorrencia: number;
    private descricao_ocorrencia: string;

    public get_descricao_ocorrencia(): string {
        return this.descricao_ocorrencia;
    }

    public set_descricao_ocorrencia(value: string) {
        this.descricao_ocorrencia = value;
    }
}