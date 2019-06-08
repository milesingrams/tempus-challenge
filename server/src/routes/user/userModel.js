import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';

let UserSchema = new mongoose.Schema({});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

let User = mongoose.model('User', UserSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default User
