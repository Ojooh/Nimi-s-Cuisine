var express = require('express');
var router = express.Router();
var adminHandler = require('../controllers/admin_controller');


/* GET home page. */
router.get('/', adminHandler.getDashboard);

/* GET NavBar Links page. */
router.get('/navbar-links', adminHandler.getNavLinks);

/* POST New NavBar Link Profile. */
router.post('/navbar-links', adminHandler.createNavLinks);

/* POST NavBar Link Profile Status. */
router.post('/navbar-link/status', adminHandler.updateNavLinkStatus);

/* POST NavBar Link Profile Edit. */
router.post('/navbar-link/edit', adminHandler.updateNavLinkProfile);

/* POST Sub NavBar Link Profile. */
router.post('/navbar-link/sub', adminHandler.createSubNavLink);

/* POST Sub NavBar Link Profile. */
router.post('/navbar-link/delete', adminHandler.destroyNavLink);








module.exports = router;