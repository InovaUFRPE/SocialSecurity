import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Ocurrence } from '../ocurrence/ocurrence';
import { OcurrenceType } from '../ocurrence-type/ocurrence-type'

@Injectable()
export class OcurrenceController {
	private API_REQRES_URL = 'http://socialsecurity.herokuapp.com/api/';

	
	constructor(public http: Http) { }

	getOcurrencesMap() {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrences/map';
			this.http.get(url)
				.subscribe((result) => {
					resolve(result.json())
				},
				(error) => {
					reject(error)
				});
		});
	}
  
	getOcurrencesFeed() {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrences/feed';
			this.http.get(url)
				.subscribe((result) => {
					resolve(result.json())
				},
				(error) => {
					reject(error)
				});
		});
	}

	getOcurrence(id: number) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrences/' + id;
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	getOcurrencePerType(type:number){
		return new Promise((resolve,reject)=> {
			let url = this.API_REQRES_URL + 'ocurrences/getType/' + type;
			this.http.get(url)
				.subscribe((result: any)=>{
					resolve(result.json())
				},
			(error)=> {
				reject(error.json())
			});
		});
	}

	getOcurrenceTypes(ocurrence){
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'ocurrence-types';
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result)
				},
				(error) => {
					reject(error)
				});
		});
	}

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

}
