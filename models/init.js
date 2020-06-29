/**
 * Created by revelation on 19/05/2020.
 */
let muser = require('./musers');
let mevent = require('./mevents');
let mprogram = require('./mprogram');
let mticket = require('./mticket');
let mnotification = require('./mnotifications');
let mspeaker = require('./mspeaker');
let msponsor = require('./msponsor');
let myenagoa = require('./myenagoa');
let mpurchase = require('./mpurchase');
let mxprograms = require('./mmyprograms');
let mexhibitors = require('./mexhibitors');
let mgeneral = require('./mgeneral');
let mmessages = require('./mmessage');
let mpoll = require('./mpolls');
let mansw = require('./manswer');
const create = false;
class init {
    constructor() {
        if (create) {
            //declare any new
            muser;
            mevent;
            mprogram;
            mticket;
            mnotification;
            mspeaker;
            msponsor;
            myenagoa;
            mpurchase;
            mxprograms;
            mexhibitors;
            mgeneral;
            mmessages;
            mpoll;
            mansw;
        }
    }
}

module.exports = init;