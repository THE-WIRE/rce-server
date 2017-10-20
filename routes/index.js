var express = require('express');
var router = express.Router();
var btoa = require("btoa");

/* GET home page. */
router.get('/', function(req, res, next) {
  var io = req.app.get('io')
  var db = req.app.get('db')
  
  io.on('connection', function (socket) {
    socket.emit('init', { connected : true});
    socket.on('my other event', function (data) {
      console.log(data);
    });

    socket.on('creds', function(data){
      console.log(data);
      //TODO : logic to connect to db and verify credentials

      if(btoa("pass") == data.password){
        console.log("Correct Pass");
      }
      else{
        console.log("incorrect");
      }
      socket.emit('confirm', {p: "Authenticated Successfully!"});
    })

    socket.on("disconnect", function(data){
      console.log("Disconnected");
    })
  });
  res.render('index', { title: 'Express' });
});

// router.get('/auth', function(req, res, next) {
//   var io = req.app.get('io');

//   io.on('connection', function(socket) {
//     socket.on('creds', function(data){
//       console.log(data);
//       socket.emit('confirm', {pos : "Authenticated Successfully!"});
//     })
//   })

//   // const conn = db.get('users');
//   // conn.find({'col_id' : '1'}, function(data, err){
//   //   if(err) console.log(err)
//   //   else
//   //     console.log(data);
//   //     res.end();
//   // })


// })

module.exports = router;
