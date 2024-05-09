const passport = require("passport");
const jwt = require("passport-jwt");
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const UserModel = require("../models/user.models.js");


const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: "coderhouse"
    }, async (jwt_payload, done) => {
        try {
            // Busca el usuario en la base de datos usando el ID del payload JWT
            const user = await UserModel.findById(jwt_payload.user._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user); // Devuelve el usuario encontrado
        } catch (error) {
            return done(error);
        }
    }));

    const GitHubStrategy = require('passport-github').Strategy;

    // Configuración de la estrategia de autenticación de GitHub
    passport.use(new GitHubStrategy({
        clientID: "Iv1.bbd6c94a8d592fa9",
        clientSecret: "31a0a8185f59ab6d185ae68eba993dcb3ec7b6da",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile:", profile);
        try {
          let user = await GithubUserModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 29,
              email: profile._json.email,
              password: ""
            }
            let result = await GithubUserModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }))
    }

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["CookieToken"]
    }
    return token;
}


module.exports = initializePassport;
