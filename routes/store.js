const express = require('express');

const router = express.Router();

const storeController = require('../controllers/store');

router.get('/store/book-details/:id', storeController.getDetails);
router.get('/', storeController.getStore);


module.exports = router;