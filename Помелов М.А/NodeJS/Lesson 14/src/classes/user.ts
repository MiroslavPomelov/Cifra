export class User {
    private _username: string;
    private _firstname: string;
    private _lastname: string;
    private _email: string;
    private _password: string;

    constructor(_username: string, _firstname: string, _lastname: string, _email: string, _password: string) {
        this._username = _username;
        this._firstname = _firstname;
        this._lastname = _lastname;
        this._email = _email;
        this._password = _password;
    }
}