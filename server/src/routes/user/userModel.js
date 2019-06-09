import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: Object
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'patient'
  }
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

let User = mongoose.model('User', UserSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default User
