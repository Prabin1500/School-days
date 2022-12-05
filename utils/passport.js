'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {getUserLogin} = require('../model/userModel');
const dotenv = require('dotenv');
dotenv.config();

//local strategy for username ans password login
passport.use(
    new Strategy(async(username, password, done) => {
        const params = [username];
        try{
            const [user] = await getUserLogin(params);
            console.log('local strategy', user);
            if(user === undefined){
                return done(null, false, {message: 'Incorrect email'});
            }

            if(user.PASSWORD !== password){
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, {...user}, {message:'Logged in successfully'});
        }catch(e){
            return done(e);
        }
    })
);

//JWT strategy for handelling bearer token
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        (jwtPayload, done) => {
            return done(null, jwtPayload);
        }
    )
);

module.exports = passport;
