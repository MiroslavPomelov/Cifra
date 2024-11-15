export class User {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    token: string | null;

    constructor(user: User);
    constructor(username: string, firstname: string, lastname: string, email: string, password: string);
    constructor(userOrUsername: User | string, firstname?: string, lastname?: string, email?: string, password?: string) {
        if (typeof userOrUsername === 'string') {
            this.username = userOrUsername;
            this.firstname = firstname!;
            this.lastname = lastname!;
            this.email = email!;
            this.password = password!;
        } else {
            this.username = userOrUsername.username;
            this.firstname = userOrUsername.firstname;
            this.lastname = userOrUsername.lastname;
            this.email = userOrUsername.email;
            this.password = userOrUsername.password;
        }
        this.token = null;
    }

    setUserToken(token: string): void {
        this.token = token;
    }
}
