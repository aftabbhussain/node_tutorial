const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

//we are adding a new instance local strategy object to the passport, created using the LocalStrategy constructor provided by passport-local
passport.use(new LocalStrategy(async (username, password, done) => {
    //this function defines the authentication logic
    try{
        const user = await Person.findOne({username : username});
        if(!user){
            return done(null, false, {message : 'Incorrect username'});
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            //done function signals passport.js about the authentication attempt
            return done(null, user);
        }
        else{
            return done(null, false, {message : 'Incorrect password'});
        }
    }
    catch(err){
        return done(err);
    }
}));

module.exports = passport; //export configured passport