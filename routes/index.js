const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send('Hello Instructor, this is my week three project, I will update swagger next week');
});

router.use('/listings', require('./users'));

module.exports = router;