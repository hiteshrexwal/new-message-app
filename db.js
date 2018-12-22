const Sequelize = require('sequelize');
const db = new Sequelize("mysql://b5fa7042b77bc2:dae5668f@us-cdbr-iron-east-01.cleardb.net/heroku_cf88678b1b1f1b1?reconnect=true", {
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


const Users=db.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true,
            isEmail:true
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    firstname:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:null
    }
},{
    timestamps:false
})

const FriendList=db.define('friendList',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    senderid:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    friendid:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
    },
    blocked:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    totalmessage:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
},{
    timestamps:false
})

const Messages=db.define('messages',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    senderId:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    recieverId:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    messages:{
        type:Sequelize.STRING(1000),
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true,
            max:1000
        }
    }
},{
    timestamps:true,
    createdAt: true,
    updatedAt: false,
})


db.sync().then(()=>console.log("Database Synced")).catch((err)=>console.log("Error in db sync"+err));
exports=module.exports={
    Users,FriendList,Messages
};