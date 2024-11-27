import passport from "passport";
import {
  Strategy as JwtStratagy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";

const secretKey = process.env.JWT_SECRET || "qwerty123456";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStratagy(options, (jwtPayload, done) => {
    try {
      const user = {
        id: jwtPayload.id,
        name: jwtPayload.name,
      };

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
