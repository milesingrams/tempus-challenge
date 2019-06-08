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
    username: req.body.username
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

export async function getList (req, res, next) {
  let users = await User.find({})
  res.status(200).json({ users });
}

export async function getById (req, res, next) {
  let user = await User.findById(req.params.userId)
  res.status(200).json({ user });
}
