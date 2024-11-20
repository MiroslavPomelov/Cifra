"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userOrUsername, firstname, lastname, email, password) {
        if (typeof userOrUsername === 'string') {
            this.username = userOrUsername;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
        }
        else {
            this.username = userOrUsername.username;
            this.firstname = userOrUsername.firstname;
            this.lastname = userOrUsername.lastname;
            this.email = userOrUsername.email;
            this.password = userOrUsername.password;
        }
        this.token = null;
        this.listOfFiles = [];
    }
    setUserToken(token) {
        this.token = token;
    }
}
exports.User = User;
