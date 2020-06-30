let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('./../utils/utils');
//models
let mpoll = require('./../models/mpolls');
let events = require('./../models/mevents');
/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign random ticket
        mpoll.create(data).then((created) => {
            util.Jwr(res, true, user, "Newly created question !");
        }).catch(err => {
            util.Jwr(res, false, [], "Error creating new question");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mpoll.findAll({where: {qtitle: data.qtitle}, include: {model: events, as: 'event'}})
            .then((user) => {
                util.Jwr(res, true, user, "Questions loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error getting questions ");
        })
    }, false)
});

/* Remove questions */
router.all('/delete-all', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mpoll.destroy({where: {qtitle: data.qtitle}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "Questions deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete questions !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting questions");
        })
    }, false)
});

/* Remove questions */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mpoll.destroy({where: {qid: data.qid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "Question deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete question !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting question");
        })
    }, false)
});

/* List All raw */
router.all('/list-all', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mpoll.findAll({order: [['qid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All questions listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list questions !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening questions");
        })
    }, true)
});

router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mpoll.aggregate('qtitle', 'DISTINCT', {order: [['qid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All questions listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list questions !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening questions");
        })
    }, true)
});

module.exports = router;