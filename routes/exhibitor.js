let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let mexhibitors = require('./../models/mexhibitors');
let muser = require('./../models/musers');

/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mexhibitors.findOrCreate({where: {eemail: data.eemail}, defaults: data})
            .then(([sponsor, created]) => {
                if (created) {
                    //create speaker account
                    muser.create(
                        {
                            uname: sponsor.ename,
                            uphone: sponsor.ephone,
                            uemail: sponsor.eemail,
                            upass: sha1('123456'),
                            ugender: sponsor.egender
                        },
                    );
                    util.Jwr(res, true, sponsor, "New exhibitor created !");
                } else {
                    util.Jwr(res, false, sponsor, "Exhibitor email already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error creating exhibitors");
        })
    }, false)
});

/* user user. */
router.all('/update', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mexhibitors.findOne({where: {eid: data.eid}})
            .then((user) => {
                if (user) {
                    //apply new updates
                    user.update(data);
                    util.Jwr(res, true, user, "Exhibitors records updated !");
                } else {
                    util.Jwr(res, false, user, "Unable to update non-existing exhibitors");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating exhibitors");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mexhibitors.findOne({where: {eid: data.eid}})
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
        mexhibitors.destroy({where: {eid: data.eid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "Exhibitor deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete exhibitor !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting exhibitor");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mexhibitors.findAll({order: [['eid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All exhibitor listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list exhibitor !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening exhibitor");
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