export class UserDto {
	private _username?: string;
	private _email?: string;
	private _password?: string;
	private _salt?: string;
	private _sessionToken?: string;

	constructor(
		username: string,
		email: string,
		password?: string,
		salt?: string,
		sessionToken?: string
	) {
		this._username = username;
		this._email = email;
		this._password = password;
		this._salt = salt;
		this._sessionToken = sessionToken;
	}

	// Getter and Setter for username
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

	// Getter and Setter for salt
	public get salt(): string | undefined {
		return this._salt;
	}

	public set salt(value: string | undefined) {
		this._salt = value;
	}

	// Getter and Setter for sessionToken
	public get sessionToken(): string | undefined {
		return this._sessionToken;
	}

	public set sessionToken(value: string | undefined) {
		this._sessionToken = value;
	}
}
