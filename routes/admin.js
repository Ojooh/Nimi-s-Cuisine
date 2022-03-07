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
router.post('/item/status', adminHandler.updateItemStatus);

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

/* POST Social Link Profile Edit. */
router.post('/social_link/edit', adminHandler.updateSocialLinkProfile);

/* POST delete Social Link Profile. */
router.post('/item/delete', adminHandler.destroyItem);

/* GET Testimonials page. */
router.get('/testimonials', adminHandler.getTestys);

/* POST add Testimonial */
router.post('/add_comment', adminHandler.addTesty);

/* POST add Testimonial */
router.post('/edit_comment', adminHandler.editTesty);

/* GET Categories page. */
router.get('/categories', adminHandler.getProdCategories);

/* POST add Category */
router.post('/add_category', adminHandler.addCategory);

/* POST edit Category */
router.post('/edit_category', adminHandler.editCategory);

/* GET Products page. */
router.get('/products', adminHandler.getProds);

/* POST add Product */
router.post('/add_product', adminHandler.addProduct);

/* POST edit Product */
router.post('/edit_product', adminHandler.editProduct);

/* GET Gallery page. */
router.get('/gallery', adminHandler.getGallery);

/* POST add Photo */
router.post('/add_photo', adminHandler.addPhoto);

/* POST edit Photo */
router.post('/edit_photo', adminHandler.editPhoto);

/* GET Events page. */
router.get('/events', adminHandler.getEvents);

/* POST add Events */
router.post('/add_event', adminHandler.addEvent);

/* POST edit Phto */
router.post('/edit_event', adminHandler.editEvent);

/* GET admins page. */
router.get('/admins', adminHandler.getAdmins);

/* POST add Product */
router.post('/add_user', adminHandler.addUser);

/* POST edit Product */
router.post('/edit_user', adminHandler.editUser);








module.exports = router;