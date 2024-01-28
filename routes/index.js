const router = require('express').Router();

/*router.use('/', require('./swagger'));*/

router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.send('Hello Instructor, this is my week three project.');
});

module.exports = router;