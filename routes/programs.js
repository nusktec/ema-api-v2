let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let mprogram = require('./../models/mprogram');
let muser = require('./../models/musers');
//database build
let Seq = require('sequelize');
/* events user. */
router.all('/list', function (req, res, next) {
    //check if body is empty
    util.JSONChecker(res, req.body, (data) => {
        mprogram.findAll({order: [['pid', 'DESC']]})
            .then((program) => {
                if (program !== null) {
                    util.Jwr(res, true, program, "successful !");
                } else {
                    util.Jwr(res, false, {}, "No program list added");
                }
            })
    }, true);
});

/* events create */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign data and create
        mprogram.findOrCreate({where: {palias: data.palias}, defaults: data})
            .then(([program, created]) => {
                if (created) {
                    util.Jwr(res, true, program, "Newly created !");
                } else {
                    util.Jwr(res, false, program, "Event already exist");
                }
            }).catch(err => {
                console.log(err);
            util.Jwr(res, false, [], "Error creating program");
        })
    }, false)
});

/* events update. */
router.all('/update', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprogram.findOne({where: {pid: data.pid}})
            .then((program) => {
                if (program) {
                    //apply new updates
                    program.update(data);
                    util.Jwr(res, true, program, "Program records updated !");
                } else {
                    util.Jwr(res, false, program, "Unable to update non-existing program");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error updating users");
        })
    }, false)
});

/* user get. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprogram.findOne({where: {[Seq.Op.or]:[{pid: data.pid}, {palias: data.pid}]}})
            .then((program) => {
                if (program) {
                    util.Jwr(res, true, program, "Program loaded !");
                } else {
                    util.Jwr(res, false, program, "No program exist !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Program getting errors");
        })
    }, false)
});

/* user get. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprogram.findOne({where: {[Seq.Op.or]:[{pid: data.pid}, {palias: data.pid}]}})
            .then((program) => {
                if (program) {
                    util.Jwr(res, true, program, "Program loaded !");
                } else {
                    util.Jwr(res, false, program, "No program exist !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Program updating users");
        })
    }, false)
});

/* Remove events */
router.all('/delete', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        mprogram.destroy({where: {pid: data.pid}})
            .then((program) => {
                if (event) {
                    util.Jwr(res, true, program, "Events deleted");
                } else {
                    util.Jwr(res, false, program, "Unable to delete program !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error deleting program");
        })
    }, false)
});

module.exports = router;