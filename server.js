const express=require('express');
const server=express();
const bodyparser=require('body-parser');
const api=require('./routes/api');
const session = require("express-session");
const passport=require('passport');
const path=require('path');
const socketio=require('socket.io');
const http=require('http');

const app=http.createServer(server);
const io=socketio(app);


let users = {};
let pending_message={};
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('login', function(data){
    console.log('a user ' + data + ' connected');
    //saving userId to array with socket ID
    users[socket.id] = data;
    console.log(socket.id)
    if(pending_message[data]){
      io.to(`${socket.id}`).emit('pending_msg',pending_message[data]);
    }
  });
  socket.on('send_msg',(data)=>{
    console.log(data);
    SID=findId(data.friendId)
    if(SID==false){
      f=data.friendId;
      delete data.friendId;
      if(pending_message[f]){
        pending_message[f].push(data);
      }
      else{
        pending_message[f]=[data];
      }
      //console.log(pending_message);
    }
    else{
      delete data.friendId;
      socket.to(`${SID}`).emit('send_msg_from_server',data);
    }
  })
  socket.on('disconnect', function(){
    console.log('user ' + users[socket.id] + ' disconnected');
    delete users[socket.id];
  });
});



server.use(session({
    secret: 'NewSecret'
}))
server.use(passport.initialize())
server.use(passport.session())

server.use(bodyparser.json())
server.use(bodyparser.urlencoded());
server.use('/',express.static(path.join(__dirname,'dist/messaging-app')));
server.use('/api',api);
server.use('/getstatus',(req,res)=>{
  let user=req.body.user;
  //console.log(users);
  res.send(false);
})
server.use('/*',(req,res)=>{
    res.redirect('/');
})


function findId(userid){
  for (var x in users){
    if(userid==users[x]){
      return x;
    }
  }
  return false;
}

const port=process.env.PORT||2400
app.listen(port,()=>{
    console.log("Server started at port 2400");
})



