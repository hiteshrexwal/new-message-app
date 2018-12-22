const route=require('express').Router();
const user=require('./user');
const friends=require('./friends');
route.use('/user',user);
route.use('/friends',friends);


exports=module.exports=route;
