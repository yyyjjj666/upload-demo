const path = require('path');
const exec = require('child_process').exec;

let baseDir = path.resolve(__dirname, '..');

let thumb_pic = (arg1, arg2) => {
    return new Promise((resolve, reject) => {
        let py_path = baseDir + "/public/py/";
        exec(`python ${py_path}thumb_pic.py  ${arg1} ${arg2}`, function (error, stdout, stderr) {
            if (stdout.length > 0) {
                console.log('you offer args:', stdout);
                resolve(true);
            } else {
                console.log('you don\'t offer args');
                resolve(false);
            }
            if (error) {
                console.info('stderr : ' + stderr);
                reject(stderr);
            }
        });
    });
};

module.exports.thumb_pic = thumb_pic;