const route=require('express').Router();
const {FriendList}=require('../db');



route.put('/acceptRequest',(req,res)=>{
    if(req.user){
        FriendList.update(
            {status:true},
            {
                where:{
                    senderid:req.body.senderid,
                    friendid:req.user.username
                }
            }
        ).then((data)=>{
            console.log(data);
            if(data){
                res.send({message:"Accepted Request"});
                FriendList.findOrCreate({
                    where:{senderid: req.user.username,
                        friendid: req.body.senderid,
                        status:true
                    }
                });
            }
        }).catch((err)=>{
            res.send({err:"Error"});
        });
    }
    else{
        res.send({err:"Error Occured"});
    }
    
})

route.use('/rejectRequest',(req,res)=>{
    
    
})

route.use('/blockUser',(req,res)=>{
    FriendList.update(
        {blocked:true},
        {
            where:{
                senderid:req.body.senderid,
                friendid:req.body.friendid
            }
        }
    )
    
})

route.post('/addfriend',(req,res)=>{
    if(req.user){
        FriendList.findOrCreate ({
            where:{senderid: req.user.username,
            friendid: req.body.friendid}
        }).then((friendadded) => {
            res.send(friendadded)
        }).catch((err)=>{
            console.log(err);
            res.send(false);
        })
    }
    else{
        res.send({err:"Some Error Occured"});
    }
    
})

route.get('/newrequest',(req,res)=>{
    if(req.user){
        FriendList.findAll({
            where:{
                friendid:req.user.username,
                status:false
            }
        }).then((list)=>{
            res.send(list);
        }).catch((err)=>{
            res.send({err:"Some Problem Occured"});
        })
    }
    else{
        res.send({err:"No User Here"});
    }
    
})

route.get('/addedfriends',(req,res)=>{
    if(req.user){
        FriendList.findAll({
            where:{
                senderid:req.user.username,
                status:true
            }
        }).then((list)=>{
            res.send(list);
        }).catch((err)=>{
            res.send({err:"Some Problem Occured"});
        })
    }
    else{
        res.send({err:"Error Occured"});
    }
    
})

module.exports=route;