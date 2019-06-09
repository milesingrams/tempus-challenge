import User from './userModel';

export async function signUp (req, res, next) {
  let user = new User({
    email: req.body.email
  })
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      next(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        User.findOne({
          email: req.body.email
        }, (err, user) => {
          res.status(201).json({ user });
        });
      })
    }
  })
}

export async function signIn (req, res) {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    res.status(200).json({ user });
  })
}

export async function signOut (req, res, next) {
  if (req.session) {
    req.logout();
    req.session.destroy(() => {
      res.clearCookie('session-id');
      res.status(204).end();
    });
  } else {
    let err = new Error('You are not logged in!');
    err.statusCode = 403;
    next(err);
  }
}

export async function getMe (req, res, next) {
  res.status(200).json({ user: req.user });
}

export async function getPatients (req, res, next) {
  let patients = await User.find({role: 'patient'})
  res.status(200).json({ patients });
}

export async function getById (req, res, next) {
  let user = await User.findById(req.params.userId)
  res.status(200).json({ user });
}
