const router = require('express').Router();

/*router.use('/', require('./swagger'));*/

router.use('/listings', require('./users'));

router.get('/', (req, res) => {
  res.send('Hello Instructor, this is my week three project, I will add on for next week');
});

module.exports = router;