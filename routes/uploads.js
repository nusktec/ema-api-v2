let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let md5 = require('md5');
const moveFile = require('move-file');
let util = require("../utils/utils");
let fileUpload = require('express-fileupload');

//configure file uploads
router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    debug: false,
    abortOnLimit: true,
    useTempFiles : true,
}));

/* login user. */
router.all('/profile', function (req, res, next) {
    //check if body is empty
    (async () => {
        let filename = "assets/profile/" + req.files.image.md5 + ".jpg";
        await moveFile(req.files.image.tempFilePath, 'public/' + filename);
        util.Jwr(res, true, {url: req.get('host') + "/" + filename}, "Uploaded !");
    })();
});

module.exports = router;