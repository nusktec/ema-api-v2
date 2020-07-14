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
let dbconn = require('./../models/mconnects');
/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign random ticket
        mpoll.create(data).then((created) => {
            util.sendNotification({title: 'New survey/poll, click to view more', body: 'Browser to events to see newly added polls/surveys',  data: {}, banner: 'https://officevibe.com/wp-content/uploads/2014/09/12-Outrageous-Employee-Survey-Statistics-That-Will-Blow-Your-Mind-INFOGRAPHIC.png'});
            util.Jwr(res, true, [], "New questions/poll added !");
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

/* get user. */
router.all('/get-id', function (req, res, next) {
    util.JSONChecker(res, req.body, async (data) => {
        if(!data.buid){
            util.Jwr(res, false, [], "Invalid BUID Number...");
            return;
        }
        const result = await dbconn.query("SELECT mp.*, pp.*, ev.eid, ev.etitle FROM `rs_mpolls` mp LEFT JOIN `rs_epurchases` pp ON mp.qeid=pp.beid LEFT JOIN `rs_events` ev ON mp.qeid=ev.eid WHERE pp.buid=" + data.buid);
        if (result[0].length > 0) {
            util.Jwr(res, true, result[0], "Your polls has been loaded");
        } else {
            util.Jwr(res, false, [], "No polls for you !");
        }
    }, false)
});

/* Remove questions */
router.all('/delete-all', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mpoll.destroy({where: {qtitle: data.qtitle}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All associated questions deleted");
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
                    util.Jwr(res, true, user, "Associated question deleted");
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