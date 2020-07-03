let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let mspeaker = require('./../models/mspeaker');

/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mspeaker.findOrCreate({where: {semail: data.semail}, defaults: data})
            .then(([user, created]) => {
                if (created) {
                    util.Jwr(res, true, user, "Newly created !");
                } else {
                    util.Jwr(res, false, user, "Email already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating speaker");
        })
    }, false)
});

/* create questions. */
router.all('/ask-question', function (req, res, next) {
    util.JSONChecker(res, req.body, async (data) => {
       const msg = await mspeaker.create(data.semail);
        util.Jwr(res, true, user, "Message created !");
    }, false)
});

/* user user. */
router.all('/update', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mspeaker.findOne({where: {sid: data.sid}})
            .then((user) => {
                if (user) {
                    //apply new updates
                    user.update(data);
                    util.Jwr(res, true, user, "Speaker records updated !");
                } else {
                    util.Jwr(res, false, user, "Unable to update non-existing speaker");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating speaker");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mspeaker.findOne({where: {sid: data.sid}})
            .then((user) => {
                util.Jwr(res, true, user, "Speaker loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating speaker");
        })
    }, false)
});

/* Remove user */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mspeaker.destroy({where: {sid: data.sid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "Speaker deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete speaker !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting speaker");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mspeaker.findAll({order: [['sid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All speaker listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list speaker !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening speaker");
        })
    }, true)
});

module.exports = router;