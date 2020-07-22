let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let {Op} = require('sequelize');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let mprolist = require('./../models/mprolist');
//models includes
let muser = require('./../models/musers');
let mprogram = require('./../models/mprogram');
let mpurchase = require('./../models/mpurchase');
let cutil = "../utils/tmpUtils";
/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign random ticket
        data.lticket = cutil.generatePTicket();
        mprolist.findOrCreate({where: {[Op.and]: [{luid: data.luid}, {lpid: data.lpid}]}, defaults: data})
            .then(([user, created]) => {
                if (created) {
                    util.Jwr(res, true, user, "Program scheduled !");
                } else {
                    util.Jwr(res, false, user, "You have added this program already");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error adding info");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprolist.findAll({
            where: {luid: data.luid},
            include: [{model: muser, as: 'user'}, {model: mprogram, as: 'program'}, {model: mpurchase, as: 'purchase'}]
        }).then((user) => {
                util.Jwr(res, true, user, "Program list loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error getting my list info ");
        })
    }, false)
});

/* get user. */
router.all('/get-ticket', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprolist.findAll({
            where: {lticket: data.lticket},
            include: [{model: muser, as: 'user'}, {model: mprogram, as: 'program'}, {model: mpurchase, as: 'purchase'}]
        }).then((user) => {
            util.Jwr(res, true, user, "Program list loaded !");
        }).catch(err => {
            util.Jwr(res, false, [], "Error getting my list info ");
        })
    }, false)
});


/* Remove user */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprolist.destroy({where: {lid: data.lid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "program info deleted");
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
        mprolist.findAll({
            order: [['lid', 'DESC']],
            include: [{model: muser, as: 'user'}, {model: mprogram, as: 'program'}, {model: mpurchase, as: 'purchase'}]
        })
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "My list listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list info !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening info");
        })
    }, true)
});

module.exports = router;