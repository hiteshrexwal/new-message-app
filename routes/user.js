const route=require('express').Router();
const {Users}=require('../db');
const passport=require('../passport');


route.get('/checkuser',(req,res)=>{
    if(req.user){
        res.status(201).send(true);
    }
    else{
        res.status(201).send(false);
    }
})
route.post('/findfriend',(req,res)=>{
    Users.findOne({
        where: {username: req.body.username}
    }).then(data=>{
        //console.log(data);
        
        if(data==null){
            res.send({message:"No such user exist"});
        }
        else{
            data.dataValues.password='';
            res.send(data);
        }
    });
})
route.get('/getuser',(req,res)=>{
    if(req.user){
        res.status(201).send(req.user);
    }
    else{
        res.status(401).send(false);
    }
})
route.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        //console.log(user);
      if (err) { return next(err); }
      if (!user) { return res.send(user) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user)
      });
    })(req, res, next);
  });

route.post('/signup', (req, res) => {
    Users.create ({
        username: req.body.username,
        password: req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }).then((createdUser) => {
        console.log(createdUser);
        res.send(true)
    }).catch((err)=>{
        console.log(err);
        res.send(false);
    })
})

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
module.exports=route;

