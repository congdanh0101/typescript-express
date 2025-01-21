interface RegisterAuthentication {
	password: string;
	salt: string;
}

export class RegisterResponse {
	private _username?: string;
	private _email?: string;
	private _authentication?: RegisterAuthentication;

	constructor(
		username: string,
		email: string,
		authentication: RegisterAuthentication
	) {
		this._authentication = authentication;
		this._email = email;
		this._username = username;
	}

	public get username(): string | undefined {
		return this._username;
	}

	public set username(value: string) {
		this._username = value;
	}

	// Getter and Setter for email
	public get email(): string | undefined {
		return this._email;
	}

	public set email(value: string) {
		this._email = value;
	}

	// Getter and Setter for password
	public get authentication(): RegisterAuthentication | undefined {
		return this._authentication;
	}

	public set authentication(value: RegisterAuthentication | undefined) {
		this._authentication = value;
	}
}
