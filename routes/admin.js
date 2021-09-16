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

/* GET Sliders page. */
router.get('/slider', adminHandler.getSliders);

/* POST New NavBar Link Profile. */
router.post('/slider', adminHandler.createSlider);

/* POST Landing Text Profile. */
router.post('/slider/landing_text', adminHandler.landingText);

/* POST NavBar Link Profile Edit. */
router.post('/slider/edit', adminHandler.updateSlider);

/* POST Destroy Slider Profile. */
router.post('/slider/delete', adminHandler.destroySlider);

/* GET Social Links page. */
router.get('/social_links', adminHandler.getSocialLinks);

/* POST New Social Link Profile. */
router.post('/social_links', adminHandler.createSocialLink);

// /* POST Social Link Profile Edit. */
// router.post('/social_links/edit', adminHandler.updateSocialLink);

// /* POST delete Social Link Profile. */
// router.post('/social_links/delete', adminHandler.destroySocialLink);








module.exports = router;