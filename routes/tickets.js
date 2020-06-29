let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
let cutil = util.util;
//models
let mticket = require('./../models/mticket');
let muser = require('./../models/musers');

/* get by ticket */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mticket.findOne({where: {tserial: data.tserial}})
            .then((ticket) => {
                if (ticket) {
                    util.Jwr(res, true, ticket, "Ticket loaded");
                } else {
                    util.Jwr(res, false, [], "Unable to find ticket number");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error finding ticket");
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
        //assign ticket from the system
        data.tunique = cutil.generateTicket();
        mticket.findOrCreate({where: {ttitle: data.ttitle}, defaults: data})
            .then(([user, created]) => {
                if (created) {
                    util.Jwr(res, true, user, "Newly created ticket !");
                } else {
                    util.Jwr(res, false, user, "Ticket already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating ticket");
        });
    }, true)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mticket.findAll({order: [['tid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All ticket listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list ticket !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening ticket");
        })
    }, true)
});

module.exports = router;