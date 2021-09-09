var express = require('express');
var router = express.Router();
var adminHandler = require('../controllers/admin_controller');


/* GET home page. */
router.get('/', adminHandler.getDashboard);

/* GET home page. */
router.get('/navbar-links', adminHandler.getNavLinks);






module.exports = router;