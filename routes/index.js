let express = require('express');
let router = express.Router();
let util = require('../utils/utils');
/* GET home page. */
router.all('/', function (req, res, next) {
   util.Jwr(res, false, {}, 'Welcome to Reedax.API Home');
});

router.get('/api', function (req, res, next) {
    util.Jwr(res, false, {}, 'Welcome to Reedax.API');
});

module.exports = router;
