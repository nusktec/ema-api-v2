let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
let muser = require('./../models/musers');
//custom libs
let util = require('../utils/utils');
//models
let msponsor = require('./../models/msponsor');

/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        msponsor.findOrCreate({where: {semail: data.semail}, defaults: data})
            .then(([sponsor, created]) => {
                if (created) {
                    //create speaker account
                    muser.create(
                        {
                            uname: sponsor.sname,
                            uphone: sponsor.sphone,
                            uemail: sponsor.semail,
                            upass: sha1('123456'),
                            ugender: sponsor.sgender
                        },
                    );
                    util.Jwr(res, true, sponsor, "New sponsor created/added !");
                } else {
                    util.Jwr(res, false, sponsor, "Email already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating sponsors");
        })
    }, false)
});

/* user user. */
router.all('/update', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        msponsor.findOne({where: {sid: data.sid}})
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
        msponsor.findOne({where: {sid: data.sid}})
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
        msponsor.destroy({where: {sid: data.sid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "Sponsor deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete sponsor !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting speaker");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        msponsor.findAll({order: [['sid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All sponsor listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list sponsor !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening sponsor");
        })
    }, true)
});

module.exports = router;

// const MYSQL_CONN = {
//     dbName: 'reedimct_ema',
//     dbUser: 'reedimct_ema',
//     dbPass: 'rBinLJcyNcua',
//     host: 'localhost',
//     port: 3306,
//     pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
// };