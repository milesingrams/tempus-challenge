import { Router } from 'express';
import userRoutes from './user';

let router = new Router()

router.use('/users', userRoutes);

router.get('*', (req, res, next) => {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});

router.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err

  if (err.shouldRedirect) {
    res.render('myErrorPage') // Renders a myErrorPage.html for the user
  } else {
    res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
  }
});

export default router;
