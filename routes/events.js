let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let mevents = require('./../models/mevents');
let mprogram = require('./../models/mprogram');

/* events user. */
router.all('/list', function (req, res, next) {
    //check if body is empty
    util.JSONChecker(res, req.body, (data) => {
        mevents.findAll({include: [{model: mprogram, as: "nprograms"}], order: [['eid', 'DESC']]})
            .then((events) => {
                if (events !== null) {
                    util.Jwr(res, true, events, "successful !");
                } else {
                    util.Jwr(res, false, {}, "No new list added");
                }
            })
    }, true);
});

/* events create */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign sha1 password
        mevents.findOrCreate({where: {etitle: data.etitle}, defaults: data})
            .then(([events, created]) => {
                if (created) {
                    util.Jwr(res, true, events, "Newly created !");
                } else {
                    util.Jwr(res, false, events, "Event already exist");
                }
            }).catch(err => {
            util.Jwr(res, false, err, "Error creating events: " + err);
        })
    }, false)
});

/* events update. */
router.all('/update', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mevents.findOne({where: {eid: data.eid}})
            .then((events) => {
                if (events) {
                    //apply new updates
                    events.update(data);
                    util.Jwr(res, true, events, "Event records updated !");
                } else {
                    util.Jwr(res, false, events, "Unable to update non-existing events");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating users");
        })
    }, false)
});

/* user get. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mevents.findOne({where: {eid: data.eid}, include: [{model: mprogram, as: "nprograms"}]})
            .then((events) => {
                if (events) {
                    util.Jwr(res, true, events, "Events loaded !");
                } else {
                    util.Jwr(res, false, events, "No event exist !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error fetching events");
        })
    }, false)
});

/* user get by organiser. */
router.all('/get-by', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mevents.findAll({where: {euid: data.euid}, include: [{model: mprogram, as: "nprograms"}]})
            .then((events) => {
                if (events) {
                    util.Jwr(res, true, events, "Events loaded for org.!");
                } else {
                    util.Jwr(res, false, events, "No event exist for org.!");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error fetching events for org.!");
        })
    }, false)
});

/* user get by organiser. */
router.all('/get-id', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mevents.findAll({where: {eid: data.eid}, include: [{model: mprogram, as: "nprograms"}]})
            .then((events) => {
                if (events) {
                    util.Jwr(res, true, events, "Events loaded for org.!");
                } else {
                    util.Jwr(res, false, events, "No event exist for org.!");
                }
            }).catch(err => {
            console.log(err);
            util.Jwr(res, false, [], "Error fetching events for org.!");
        })
    }, false)
});

/* user get by alias. */
router.all('/get-alias', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mevents.findOne({where: {ealias: data.ealias}, include: [{model: mprogram, as: "nprograms"}]})
            .then((events) => {
                if (events) {
                    util.Jwr(res, true, events, "Events loaded !");
                } else {
                    util.Jwr(res, false, events, "No event associated !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error fetching alias users");
        })
    }, false)
});

/* Remove events */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprogram.findOne({where: {peid: data.eid}})
            .then(program => {
                if (!program) {
                    mevents.destroy({where: {eid: data.eid}})
                        .then((event) => {
                            if (event) {
                                util.Jwr(res, true, [], "Events deleted");
                            } else {
                                util.Jwr(res, false, [], "Unable to delete no-existing events !");
                            }
                        }).catch(err => {
                        util.Jwr(res, false, [], "Error deleting events");
                    })
                } else {
                    util.Jwr(res, false, [], "Event linked to one or more programs, delete programs associated and try again.");
                }
            })
    }, false);
});

module.exports = router;