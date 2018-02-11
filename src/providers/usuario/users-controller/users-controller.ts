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
					reject(error.json())
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

	logout(cod_device){
		return new Promise((resolve, reject) => {
			this.http.put(this.API_REQRES_URL + 'users/logout/'+ cod_device.toString(),null)
				.subscribe((result: any) => {					
					resolve(result.json())
				},
				(error) => {
					reject(error);
				});
		});
	}

	getUser(id: number) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'users/' + id;
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	updateUser(id: number, user: any) {
		return new Promise((resolve, reject) => {
			this.http.put(this.API_REQRES_URL + 'users/update/' + id, user)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error);
				});
		});
	}

	createContact(data){
		return new Promise((resolve, reject) => {
			this.http.post(this.API_REQRES_URL + 'contact', data)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	getContact(id: number) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'contact/' + id;
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

	updateContact(id: number, contact: any){
		return new Promise((resolve, reject) => {
			this.http.put(this.API_REQRES_URL + 'contact/update/' + id, contact)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error);
				});
		});
	}

}