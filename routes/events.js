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
        mevents.findAll({
            where: {eprivate: 0, estatus: 1},
            include: [{model: mprogram, as: "nprograms"}],
            order: [['eid', 'DESC']],
        }).then((events) => {
                if (events !== null) {
                    util.Jwr(res, true, events, "successful !");
                } else {
                    util.Jwr(res, false, {}, "No new list added");
                }
            })
    }, true);
});

/* events user. */
router.all('/list-adm', function (req, res, next) {
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
                    //send notifications
                    util.sendNotification({
                        title: 'New event has been added to click to view more details',
                        body: events.etitle,
                        data: {isEvent: true, eid: events.eid},
                        banner: events.ebanner
                    });
                    //do audit
                    util.doAudit(data.euid, (data.euid ? 'Admin ' : 'Navigated user ') + 'created new event titled ' + data.etitle)
                    util.Jwr(res, true, events, "New event has been created !");
                } else {
                    util.Jwr(res, false, events, "Event with similar title already existing...");
                }
            }).catch(err => {
            util.Jwr(res, false, err, "Error creating new events: " + err);
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
                    util.sendNotification({
                        title: 'New changes has occur in one or more events, click to view more',
                        body: events.etitle + ' has been updated recently !',
                        data: {},
                        banner: events.ebanner
                    });
                    util.doAudit(data.euid, (data.euid ? 'Admin ' : 'Navigated user ') + 'just updated an event titled ' + data.etitle)
                    events.update(data);
                    util.Jwr(res, true, events, "The even't records has been updated !");
                } else {
                    util.Jwr(res, false, events, "Unable to update non-existing events");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating the selected event");
        })
    }, false)
});

/* user get. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mevents.findOne({where: {eid: data.eid, estatus: 1}, include: [{model: mprogram, as: "nprograms"}]})
            .then((events) => {
                if (events) {
                    util.Jwr(res, true, events, "Events has been loaded !");
                } else {
                    util.Jwr(res, false, events, "No event exist withing the range");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error fetching events");
        })
    }, false)
});

/* user get by organiser. */
router.all('/get-by', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mevents.findAll({where: {euid: data.euid, estatus: 1}, include: [{model: mprogram, as: "nprograms"}]})
            .then((events) => {
                if (events) {
                    util.Jwr(res, true, events, "Events has been loaded for org.!");
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
        mevents.findOne({where: {eid: data.eid, estatus: 1}, include: [{model: mprogram, as: "nprograms"}]})
            .then((events) => {
                if (events) {
                    util.Jwr(res, true, events, "Events has been loaded for org.!");
                } else {
                    util.Jwr(res, false, events, "No event exist for org.!");
                }
            }).catch(err => {
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
                    util.Jwr(res, true, events, "Events has been loaded !");
                } else {
                    util.Jwr(res, false, events, "No event associated with your query !");
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
                                //do audit
                                util.doAudit(null, 'Navigated user ' + 'deleted an event ');
                                util.Jwr(res, true, [], "Events has been deleted successfully");
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