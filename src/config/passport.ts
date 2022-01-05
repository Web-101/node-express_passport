// import libs
import passport_local from 'passport-local';
import bcrypt from 'bcryptjs';

// load user model
import User from '../models/User';

const LocalStrategy = passport_local.Strategy;

export default function(passport: any) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email: string, password: string, done: any) => {
      // Match user
      User.findOne({ email: email })
        .then((user: any) => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err: any, isMatch: any) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch((err: any) => console.log(err));
    })
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });
}