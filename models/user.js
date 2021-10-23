const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String,reqiured : true},
    password : {type : String},
    id:{type : String},
    favouriteTeam : {type:String},
    points : {type:Number  },
    games : [{
        id:{type:Number},
        homeTeamScore : {type:Number},
        awayTeamScore : {type:Number},
        homeTeamName : {type:String},
        awayTeamName : {type:String},
    }]
})

module.exports = mongoose.model("User",userSchema);