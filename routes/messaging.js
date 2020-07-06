let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let mmessage = require('./../models/mmessage');
let users = require('./../models/musers');
let events = require('./../models/mevents');

/* create questions. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmessage.create(data).then(resp => {
            util.Jwr(res, true, resp, "Message created !");
        }).catch(err => {
            util.Jwr(res, false, err, "Unable to create message...");
        })
    }, false)
});

/* get user. */
router.all('/get-from', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmessage.findAll({
            where: {mfrom: data.mfrom},
            include: [{model: users, as: 'user'}, {model: events, as: 'event', attributes: ['eid', 'etitle', 'elocation', 'estart_date', 'eend_date']}]
        }).then((user) => {
                util.Jwr(res, true, user, "Your messages listed !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error listing messages");
        })
    }, false)
});

/* List All belonging messages */
router.all('/get-to', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmessage.findAll({
            where: {mto: data.mto},
            order: [['mid', 'DESC']],
            include: [{model: users, as: 'user'}, {model: events, as: 'event',
                attributes: ['eid', 'etitle', 'elocation', 'estart_date', 'eend_date']}]
        }).then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All message sent listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list your messages !");
                }
            }).catch(err => {
            console.log(err);
            util.Jwr(res, false, [], "Error listening messages");
        })
    }, true)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmessage.findAll({
            order: [['mid', 'DESC']],
            include: [{model: users, as: 'user'}, {model: events, as: 'event', attributes: ['eid', 'etitle', 'elocation', 'estart_date', 'eend_date']}]
        })
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All messages");
                } else {
                    util.Jwr(res, false, user, "Unable to list messages !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening messages");
        })
    }, true)
});

module.exports = router;