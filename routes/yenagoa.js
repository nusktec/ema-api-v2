let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let myenagoa = require('./../models/myenagoa');

/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        myenagoa.findOrCreate({where: {yemail: data.yemail}, defaults: data})
            .then(([user, created]) => {
                if (created) {
                    util.Jwr(res, true, user, "New yenagoa date has created !");
                } else {
                    util.Jwr(res, false, user, "Email already exist for yenagoa content");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating yenagoa ");
        })
    }, false)
});

/* user user. */
router.all('/update', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        myenagoa.findOne({where: {yid: data.yid}})
            .then((user) => {
                if (user) {
                    //apply new updates
                    user.update(data);
                    util.Jwr(res, true, user, "Yenagoa records updated !");
                } else {
                    util.Jwr(res, false, user, "Unable to update non-existing yenagoa");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating yenagoa");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        myenagoa.findOne({where: {yid: data.yid}})
            .then((user) => {
                util.Jwr(res, true, user, "Yenagoa loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating Yenagoa");
        })
    }, false)
});

/* Remove user */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        myenagoa.destroy({where: {yid: data.yid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "Yenagoa deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete Yenagoa !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting Yenagoa");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        myenagoa.findAll({order: [['yid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All speaker listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list Yenagoa !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening Yenagoa");
        })
    }, true)
});

module.exports = router;