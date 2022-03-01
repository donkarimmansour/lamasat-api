const passport = require("passport");
const passportJwT = require("passport-jwt").Strategy;
const passportExtractJwt = require("passport-jwt").ExtractJwt;

const newRole = (name , role , msg , testMod = false) => {
    passport.use(name , new passportJwT({
        jwtFromRequest: passportExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: process.env.KEY
    }, (Jwt_payload, done) => {
        if (role.includes(Jwt_payload.rule) || testMod) {
            return done(null, true)
        } else {
            return done({"message" : msg }, false) 
        }
    
    }))
}


newRole("superAdmin" , ["superAdmin"] , "superAdmin permission denied" , false)
newRole("admin" , ["admin"] , "admin permission denied" , false)
newRole("adminOrsuperAdmin" , ["admin" , "superAdmin"] , "admin Or superAdmin permission denied" , false)

