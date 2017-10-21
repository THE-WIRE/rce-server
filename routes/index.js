var express = require('express');
var router = express.Router();
var btoa = require("btoa");

/* GET home page. */
router.get('/', function(req, res, next) {
  var io = req.app.get('io')
  var db = req.app.get('db')

  var t_users = req.app.get('t_users')
  io.sockets.on('t_users',function(data){
    console.log("t_users emit :", data);
  })
  
  
  io.on('connection', function (socket) {
    t_users++;
    console.log("T_USERS", t_users);
    socket.emit('init', { connected : true});
    socket.on('my other event', function (data) {
      console.log(data);
    });

    io.sockets.emit('t_users', { count: t_users});
    console.log("T_USERS", t_users);
    socket.on('creds', function(data){
      console.log(data);
      //TODO : logic to connect to db and verify credentials
      const user = db.get('rce-user');

        user.find(data, function(err, data){
          if(err) throw err
          else{
            console.log(data);
            socket.emit('confirm', {p: "Authenticated Successfully!"});
          }
        })
      })

      socket.on("disconnect", function(data){
        t_users--;
        console.log("T_USERS", t_users);
        io.emit('t_users', { count: t_users});
        console.log("Disconnected");
      })

    })
    
  res.render('index', { title: 'Express' });
});




router.get('/auth', function(req, res, next) {
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

    // var db = req.app.get('db');
    // const user = db.get('rce-user');
    
    // data = {
    //   username : "suyog"
    // }
    // user.find(data, function(data, error){
    //   console.log(error);
    //   res.end();
    // })
})

module.exports = router;
