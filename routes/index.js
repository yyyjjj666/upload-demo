var express = require('express');
var router = express.Router();

const path = require('path');
const os = require('os');
const multiparty = require('multiparty');

let thumb_pic = require('../lib/picHelper').thumb_pic;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/file/uploadimg', function (req, res, next) {
    let upload = uploadPath();
    console.dir(upload);
    let form = new multiparty.Form({
        uploadDir: upload.path
    });
    form.on('error', function (err) {
        console.log('Error parsing form: ' + err.stack);
    });
    form.on('file', (name, file) => {
        console.log(file);
        res.json(file);
        thumb_pic(file.path, get_thumb_path(upload, file.path));
    });
    form.on('close', function () {
        console.log('Upload completed!');
    });
    form.parse(req);

});

let uploadPath = () => {
    let root = path.join(__dirname, '../');
    let host = "http://localhost:2000";
    let image = {};
    if (os.platform() === "win32") {
        image.path = root + "public\\images\\";
    } else {
        image.path = root + "public/images/";
    }
    image.url = host + "images/p-upload/";
    return image;
};

let get_thumb_path = (upload, path) => {
    let filename = path.substr(upload.path.length, path.length - upload.path.length);
    return upload.path + "t_" + filename;
};
module.exports = router;
