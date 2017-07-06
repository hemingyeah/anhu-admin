
var fs = require('fs');
var qs = require('querystring');
var express = require('express');
var app = express();

// var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var request = require('request');
var sign = require('./sign.js');

var weixinJsConfig = require('weixin-node-jssdk');
var options = {};

// function handler(req, res) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.writeHead(200);
//     res.end(data);
// }




server.listen(8090, function(){
  console.log('listening on *:8090');
});
// //设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

io.on('connection', function(socket) {
    socket.emit('news', {'x': 1});
    socket.on('transmissionUrl', function(data) {
    	console.log(data);
        options.appId = 'wx6213cca4d53bfc5a';
        options.appSecret = 'a6096c086a58e27e85c074a171b89a30';
        options.url = data.url;
        weixinJsConfig(options, function(error, config) {
            console.log(config)
            app.get('/api/test', function(req, res) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(config)
            })
        });

    });

});


// 静态文件目录
// var staticDir = path.join(__dirname, '/upload');

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// app.use('/', express.static(staticDir));

//登录接口
app.post('/base/login', function(req, res) {
  fs.readFile('./server/api/login.json', {
    encoding: 'utf-8'
  }, function(error, data) {
    if (error) console.log(error);
    res.send(data);
  });
  //res.json({"code":"0","msg":"","data":{"token":"B1285192E36CC63F23F2428EBAF9A37F"}});
  //res.send('you have send post message');
});