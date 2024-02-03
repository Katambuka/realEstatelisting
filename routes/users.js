const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.getAll);

router.get('/:id',userController.getSingle);

router.post('/', userController.createListing);

router.put('/:id',userController.updateListing);

router.delete('/:id',userController.deleteListing);

module.exports = router;
