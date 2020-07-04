let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let purchase = require('./../models/mpurchase');
let cutil = require("../utils/tmpUtils");
//add model
let mevents = require('./../models/mevents');
let mconnects = require('./../models/mconnects');
let {QueryTypes} = require('sequelize');
/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign random ticket
        data.bticket = cutil.generateTicket();
        purchase.findOrCreate({where: {bticket: data.bticket}, defaults: data})
            .then(([user, created]) => {
                if (created) {
                    util.Jwr(res, true, user, "Newly created purchase !");
                } else {
                    util.Jwr(res, false, user, "Ticket already already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, err, "Error creating purchases");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        purchase.findAll({where: {buid: data.buid}})
            .then((user) => {
                util.Jwr(res, true, user, "Event loaded ! ");
            }).catch(err => {
            util.Jwr(res, false, err, "Error getting ticket ");
        })
    }, false)
});

/* get user. */
router.all('/get-full', function (req, res, next) {
    util.JSONChecker(res, req.body, async (data) => {
        const result = await mconnects.query("SELECT ex.eid, ex.etitle, ex.ebanner, e.*, u.* FROM `rs_epurchases` e LEFT JOIN `rs_users` u ON e.buid=u.uid LEFT JOIN `rs_events` ex ON e.beid=ex.eid", {
            plain: false,
            raw: true,
            type: QueryTypes.SELECT
        });
        if (result) {
            util.Jwr(res, false, result, "Event full loaded...");
        } else {
            util.Jwr(res, false, [], "Event full loaded...");
        }
    }, false)
});

router.all('/get-event-full', function (req, res, next) {
    util.JSONChecker(res, req.body, async (data) => {
        //return error
        if (data.beid) {
            const result = await mconnects.query("SELECT ex.eid, ex.etitle, ex.ebanner, e.*, u.* FROM `rs_epurchases` e LEFT JOIN `rs_users` u ON e.buid=u.uid LEFT JOIN `rs_events` ex ON e.beid=ex.eid WHERE e.beid=" + data.beid, {
                plain: false,
                raw: true,
                type: QueryTypes.SELECT
            });
            if (result[0].length > 0) {
                util.Jwr(res, false, result, "Event full loaded...");
            } else {
                util.Jwr(res, false, [], "Error loading event full path or event id not valid...");
            }
        } else {
            util.Jwr(res, false, [], "Error loading event full path, no event id passed...");
        }
    }, false)
});

router.all('/get-id-full', function (req, res, next) {
    util.JSONChecker(res, req.body, async (data) => {
        //return error
        if (data.buid) {
            const result = await mconnects.query("SELECT ex.eid, ex.etitle, ex.ebanner, e.*, u.* FROM `rs_epurchases` e LEFT JOIN `rs_users` u ON e.buid=u.uid LEFT JOIN `rs_events` ex ON e.beid=ex.eid WHERE e.buid=" + data.buid, {
                plain: false,
                raw: true,
                type: QueryTypes.SELECT
            });
            if (result[0].length > 0) {
                util.Jwr(res, false, result, "Event full loaded...");
            } else {
                util.Jwr(res, false, [], "Error loading event full path or event id not valid...");
            }
        } else {
            util.Jwr(res, false, [], "Error loading event full path, no event id passed...");
        }
    }, false)
});


/* get ticket. */
router.all('/get-ticket', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        purchase.findAll({where: {bticket: data.bticket}})
            .then((user) => {
                util.Jwr(res, true, user, "Event loaded ! ");
            }).catch(err => {
            util.Jwr(res, false, err, "Error getting ticket ");
        })
    }, false)
});

/* Remove user */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        purchase.destroy({where: {bid: data.bid}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "Ticket deleted");
                } else {
                    util.Jwr(res, false, user, "Unable to delete Ticket !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting ticket");
        })
    }, false)
});

/* List All Users */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        purchase.findAll({order: [['bid', 'DESC']]})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All purchase listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list ticket !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening ticket");
        })
    }, true)
});

module.exports = router;