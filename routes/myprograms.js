let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let mmyprograms = require('./../models/mmyprograms');

/* create user. */
router.all('/add', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmyprograms.findOrCreate({where: {xid: 0}, defaults: data})
            .then(([sponsor, created]) => {
                if (created) {
                    util.Jwr(res, true, sponsor, "New program added/created successfully !");
                } else {
                    util.Jwr(res, false, sponsor, "Zero index already exist or trim inputs");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error adding events");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmyprograms.findOne({where: {xid: data.xid}})
            .then((user) => {
                util.Jwr(res, true, user, "Successfully loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating");
        })
    }, false)
});

/* Remove user */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmyprograms.destroy({where: {xid: data.xid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "The selected program has been deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete my program !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting my program");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mmyprograms.findAll({order: [['xid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All programs listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list programs !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening programs");
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