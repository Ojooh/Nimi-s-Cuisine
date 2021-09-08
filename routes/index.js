var express = require('express');
var router = express.Router();
var indexHandler = require('../controllers/index_controller');

/* GET home page. */
router.get('/', indexHandler.getHomePage);

module.exports = router;
