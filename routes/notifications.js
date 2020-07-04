let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
let cutil = util.util;
//models
let mnotifications = require('./../models/mnotifications');

/* get by ticket */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mnotifications.findAll({where: {nuid: data.nuid}})
            .then((ticket) => {
                if (ticket) {
                    util.Jwr(res, true, ticket, "Notifications loaded");
                } else {
                    util.Jwr(res, false, [], "Unable to find Notifications");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error finding Notifications");
        })
    }, false)
});

// /* get by id */
// router.all('/get', function (req, res, next) {
//     util.JSONChecker(res, req.body, (data) => {
//         mticket.findOne({where: {tid: data.tid}})
//             .then((ticket) => {
//                 if (ticket) {
//                     util.Jwr(res, true, ticket, "Ticket loaded");
//                 } else {
//                     util.Jwr(res, false, [], "Unable to find ticket id");
//                 }
//             }).catch(err => {
//             util.Jwr(res, false, [], "Error finding ticket");
//         })
//     }, false)
// });

/* create ticket. */
router.all('/create', function (req, res, next) {
    //end of jwt token
    util.JSONChecker(res, req.body, (data) => {
        mnotifications.create(data).then((created) => {
            util.Jwr(res, true, created, "Newly created notifications !");
        }).catch(err => {
            console.log(err);
            util.Jwr(res, false, [], "Error creating Notifications");
        });
    }, true)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mnotifications.findAll({order: [['nid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All Notifications listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list Notifications !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening Notifications");
        })
    }, true)
});

module.exports = router;