let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let general = require('./../models/mgeneral');

/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign random ticket
        general.findOrCreate({where: {galias: data.galias}, defaults: data})
            .then(([user, created]) => {
                if (created) {
                    util.Jwr(res, true, user, "New information/content created !");
                } else {
                    util.Jwr(res, false, user, "info already already exist with similar title");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating info");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        general.findOne({where: {galias: data.galias}})
            .then((user) => {
                util.Jwr(res, true, user, "Info loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error getting info ");
        })
    }, false)
});

/* get info type. */
router.all('/get-type', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        general.findOne({where: {gtype: data.gtype}})
            .then((user) => {
                util.Jwr(res, true, user, "Info loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error getting info ");
        })
    }, false)
});


/* Remove user */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        general.destroy({where: {gid: data.gid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "info deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete Info !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting ticket");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        general.findAll({order: [['gid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All info listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list info !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening info");
        })
    }, true)
});

module.exports = router;