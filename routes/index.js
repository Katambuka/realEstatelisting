const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/login', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => res.redirect('/')
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.username}, welcome back!`);
  } else {
    res.send('Hello Instructor, this is my week three and four project final projects on Real Estate Listings');
  }
});

router.use('/listings', require('./users'));

module.exports = router;
