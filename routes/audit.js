let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let muser = require('./../models/musers');
let maudit = require('./../models/maudit');

/* List All raw */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        maudit.findAll({order: [['aid', 'DESC']], include: {model: muser, as: 'user'}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All audit listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list audit !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening audit");
        })
    }, true)
});

module.exports = router;