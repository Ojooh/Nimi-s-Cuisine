var express = require('express');
var router = express.Router();
var loginHandler = require('../controllers/login_controller');

/* GET login page. */
router.get('/', loginHandler.loginPage);

/* GET login page. */
router.get('/login', loginHandler.loginPage);

/* POST to login page. */
router.post('/', loginHandler.logIn);

/* POST to login page. */
router.post('/login', loginHandler.logIn);

/* LOGOUT. */
router.get('/logout', loginHandler.logOut);

module.exports = router;



