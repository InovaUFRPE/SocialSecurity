import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { filterQueryId } from '@angular/core/src/view/util';

@Injectable()
export class UsersController {
	private API_REQRES_URL = 'http://socialsecurity.herokuapp.com/api/';

	constructor(public http: Http) { }

	createAccount(data) {
		return new Promise((resolve, reject) => {
			this.http.post(this.API_REQRES_URL + 'users', data)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	verifyUser(email: string, pass: string) {
		return new Promise((resolve, reject) => {
			var data = {
				'email_usuario': email,
				'senha_usuario': pass
			};
			this.http.get(this.API_REQRES_URL + 'users/validate/user/'+ JSON.stringify(data))
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error)
				});
		});
	}

	verifyDevice(device: string) {
		return new Promise((resolve, reject) => {
			this.http.get(this.API_REQRES_URL + 'device/validate/'+ device.toString())
				.subscribe((result: any) => {					
					resolve(result.json())
				},
				(error) => {
					let body = {"cod_device":device.toString()}
					this.http.post(this.API_REQRES_URL + 'device',body).subscribe(
						(result: any) => {
							resolve(result.json())
						},
						(error) => {
							reject(error)
						});
				});
		});
	}

	login(cod_user,cod_device){
		return new Promise((resolve, reject) => {
			let body = { "cod_usuario": cod_user}
			this.http.put(this.API_REQRES_URL + 'users/login/'+ cod_device.toString(),body)
				.subscribe((result: any) => {					
					resolve(result.json())
				},
				(error) => {
					reject(error);
				});
		});
	}

}