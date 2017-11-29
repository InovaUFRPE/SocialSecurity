import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

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

	login(email: string, pass: string) {
		return new Promise((resolve, reject) => {
			var data = {
				'email_usuario': email,
				'senha_usuario': pass
			};
			this.http.get(this.API_REQRES_URL + 'login/'+ JSON.stringify(data))
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error)
				});
		});
	}

	getUsers() {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'users';
			this.http.get(url)
				.subscribe((result: any) => {
					resolve(result)
				},
				(error) => {
					reject(error)
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

	insetUser(user: any) {
		return new Promise((resolve, reject) => {
			let url = this.API_REQRES_URL + 'users';
			this.http.post(url, user)
				.subscribe((result: any) => {
					resolve(result.json())
				},
				(error) => {
					reject(error.json())
				});
		});
	}

}