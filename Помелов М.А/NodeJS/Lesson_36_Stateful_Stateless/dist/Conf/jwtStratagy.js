"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const secretKey = process.env.JWT_SECRET || "qwerty123456";
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (jwtPayload, done) => {
    try {
        const user = {
            id: jwtPayload.id,
            name: jwtPayload.name,
        };
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false);
    }
}));
exports.default = passport_1.default;
