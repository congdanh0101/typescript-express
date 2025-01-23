

export class RegisterResponse {
	private _username?: string;
	private _email?: string;
	private _password?: string;

	constructor(
		username: string,
		email: string,
		password: string
	) {
		this._password = password;
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
	public get password(): string | undefined {
		return this._password;
	}

	public set password(value: string | undefined) {
		this._password = value;
	}
}
