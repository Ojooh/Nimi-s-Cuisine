var express = require('express');
var router = express.Router();
var indexHandler = require('../controllers/index_controller');

/* GET home page. */
router.get('/', indexHandler.getHomePage);

router.get('/testimonial/share/:id', indexHandler.getShareTesty);

router.get('/verify/:id', indexHandler.verifyAdmin);

/* POST add Testimonial */
router.post('/add_comment', indexHandler.addTesty);

router.post('/activate_account', indexHandler.activate);

module.exports = router;
