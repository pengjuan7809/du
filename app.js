var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        let filename = (file.originalname).split('.');  //['文件名','文件后缀'] eg: 1.png
        cb(null, `${Date.now()}.${filename[filename.length-1]}` ); //参数1 null ,参数2 时间戳+后缀
     }
 }); 
var upload = multer({ storage: storage });

// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('originalname: %s', file.originalname);
    console.log('filename: %s', file.filename);
    console.log('文件保存路径：%s', file.path);

    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(4000);