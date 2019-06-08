import User from './userModel';

export async function signUp (req, res) {
  let user = await new User({
    email: req.body.email
  })
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      res.status(500).json({
        err: err
      });
    } else {
      passport.authenticate('local')(req, res, () => {
        User.findOne({
          email: req.body.email
        }, (err, user) => {
          res.status(200).json({
            success: true,
            status: 'Registration Successful!'
          });
        });
      })
    }
  })
}

export async function signIn (req, res) {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    res.status(200).json({
      success: true,
      status: 'You are successfully logged in!'
    });
  })
}

export async function signOut (req, res, next) {
  if (req.session) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('session-id');
        res.json({
          message: 'You are successfully logged out!'
        });
      }
    });
  } else {
    let err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
}
