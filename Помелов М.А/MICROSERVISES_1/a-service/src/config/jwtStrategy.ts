import {Strategy as JwtStrategy, ExtractJwt,  StrategyOptions} from 'passport-jwt'; 
import passport from 'passport'; 

// Секретный ключ для подписи JWT 
const secretKey = process.env.JWT_SECRET || 'Pinegun_key_2327'; 

const options: StrategyOptions = {jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: secretKey,}; 
passport.use(new JwtStrategy(options, async(jwtPayload, done) =>  { 
    try {
        console.log(ExtractJwt.fromAuthHeaderAsBearerToken()) 
        console.log(jwtPayload)
        console.log(jwtPayload.id)
        const response = await fetch(`http://users-service:3000/users/${jwtPayload.id}`);
        const user = await response.json();       
        
        if (user){ 
            return done(null, true); 
        }
        else { 
        return done(null, false); 
        }           
    }
    catch (err) { 
    return done(err, false); 
    }        
}));

export  default  passport  ;