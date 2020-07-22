/**
 * Created by revelation on 18/05/2020.
 */
let OneSignal = require('onesignal-node');
let tmpUtils = require('./tmpUtils');
//add models
let audit = require('./../models/maudit');
//json writer
function Jwr(res, status, data, msg) {
    res.jsonp({status: status, data: data, msg: msg});
}

//check if body is empty
function checkBody(res, body, cbk, isTrue) {
    if (isTrue) {
        cbk(body);
        return;
    }
    if (typeof body !== 'undefined' && body !== null && Object.keys(body).length > 0) {
        cbk(body);
    } else {
        Jwr(res, false, {}, "Requested body seems blank");
    }
}

//send one signal notifications
function sendNotification(body) {
    const client = new OneSignal.Client('a0055f93-16b8-422f-bc8f-efd313c66b16', 'ZDRiYWE1MDItMWUxMi00YzY3LThhMTMtYmM0N2FlMDEwN2Y5');
    const notification = {
        contents: {
            'en': body.body,
        },
        headings: {'en': body.title},
        big_picture: body.banner,
        data: body.data,
        small_icon: '@mipmap/ic_launcher',
        included_segments: ["Active Users", "Inactive Users"],
    };
    client.createNotification(notification).then(response => {
        //console.log(response)
    }).catch(e => {
        //console.log("Error: ", e)
    });
}

//do audits
function doAudit(uid, body) {
    if (body !== null) {
        audit.create({auid: uid, aaction: body});
        console.log("Audit created successfully...")
    }
}
//export modules
module.exports = {Jwr: Jwr, JSONChecker: checkBody, util: tmpUtils, sendNotification, doAudit};

// // Your code here!
// $fields = array(
//     'app_id' => $appId,
//     'included_segments' => ["Active Users", "Inactive Users"],
//     'contents' => array("en" => $message),
// 'headings' => array("en" => $title),
// 'big_picture'=>'https://ellingtonelectric.com/dwn/quote/'.$img,
//     'data' => array("image"=>$img, "quote"=>$message, "author"=>$title),
// 'large_icon' => 'https://ellingtonelectric.com/dwn/quote/'.$img,
//     'ios_attachments'=>array('id1'=>'https://ellingtonelectric.com/dwn/quote/'.$img),
// 'small_icon'=>'@mipmap/ic_launcher',
// );