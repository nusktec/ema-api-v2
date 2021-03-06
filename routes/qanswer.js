let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
let auth = require('./../auth/auth');
//custom libs
let util = require('../utils/utils');
//models
let manswer = require('./../models/manswer');
let mpoll = require('./../models/mpolls');
let dbconn = require('./../models/mconnects');

/* create user. */
router.all('/create', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        //assign random ticket
        manswer.create(data).then((created) => {
            if (created) {
                util.Jwr(res, true, [], "Your answer has been submitted !");
            } else {
                util.Jwr(res, false, [], "Unable to response to this poll");
            }
        }).catch(err => {
            util.Jwr(res, false, [], "Error poll ans. submission");
        })
    }, false)
});

/* get user. */
router.all('/get', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        manswer.findAll({where: {auid: data.auid}, include: {model: mpoll, as: 'poll'}})
            .then((user) => {
                util.Jwr(res, true, user, "Answers loaded !");
            }).catch(err => {
            util.Jwr(res, false, [], "Error getting your responses ");
        })
    }, false)
});

/* List All raw */
router.all('/list', function (req, res, next) {
    util.JSONChecker(res, req.body, (data) => {
        manswer.findAll({where: {aqid: data.aqid}, order: [['aid', 'DESC']], include: {model: mpoll, as: 'poll'}})
            .then((user) => {
                if (user) {
                    util.Jwr(res, true, user, "All responses listed");
                } else {
                    util.Jwr(res, false, user, "Unable to list responses !");
                }
            }).catch(err => {
            util.Jwr(res, false, [], "Error listening responses");
        })
    }, true)
});

/* List all answers from users */
router.all('/list-title', function (req, res, next) {
    util.JSONChecker(res, req.body, async (data) => {
        if(data.qtitle && data.qtitle!==''){
            //read mysql raw
            const resp = await dbconn.query("select * from `rs_manswers` ans RIGHT JOIN `rs_mpolls` pol ON pol.qid=ans.aqid  LEFT JOIN `rs_users` usr ON ans.auid=usr.uid where pol.qtitle='"+data.qtitle+"'");
            if(resp && resp[0].length>0){
                util.Jwr(res, true, resp[0], "Polling listed as required !");
            }else{
                util.Jwr(res, false, [], "No poll / survey were answered");
            }
            return;
        }
        util.Jwr(res, false, [], "Unable to list responses !");
    }, true)
});

module.exports = router;