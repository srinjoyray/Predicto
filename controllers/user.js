const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user.js');

const signin = async(req,res) => {
    const {email,password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password); 

        if(!isPasswordCorrect) return res.status(400).json({message :"Invalid credentials"});

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"365d"}) 

        res.status(200).json({result:existingUser,token});
    }catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }
}

const signup = async(req,res) => {
    const {email,password,confirmPassword,firstName,lastName} = req.body;
    
    try{
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message : "User already exist"});
        if(password!==confirmPassword) return res.status(400).json({message : "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`,points:5});

        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"365d"}) 

        res.status(200).json({result,token});
    }catch(error){
        res.status(500).json({message:'Something went wrong.'})
    }
}

const googleLogin = async (req,res) => {
    const {name,email} = req.body ;
    try{
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(200).json({message : "Signed in"});
        

        const result = await User.create({email,name,points:5});

        res.status(200).json({message : "Signed in"});
    }catch(error){
        res.status(500).json({message:'Something went wrong.'})
    }
}

const getUser = async (req, res) => {
    
    try{
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
        }
        let user;
        if(req.email){
            user = await User.find({'email' : req.email});  
            user=user[0];
        }else{
            user = await User.findOne({_id : req.userId});
        }

        return res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message:'Something went wrong.'})
    }
    
}

const updateGames = async(req,res) =>{

    try {
        
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
        }
        const {item,counter1,counter2} = req.body;
        // console.log(counter1,counter2);
        let user;
        if(req.email){
            user = await User.find({'email' : req.email});  
            user=user[0];
        }else{
            user = await User.findOne({_id : req.userId});
        }
       
        const games = user.games;
        const find = games.find( ({ id }) => id === item.id );
        
        if(!find){
            games.push({id:item.id,homeTeamScore:counter1 , awayTeamScore:counter2, homeTeamName:item['home-team'].name,awayTeamName:item['away-team'].name});
        } 
        else games.map((game)=>{
            if(game.id === item.id) {
                game.homeTeamScore=counter1,
                game.awayTeamScore=counter2
            }
        })
    
        user.games=games;
        // console.log(user);
        let result;
        if(req.email){
            result = await User.updateOne({_id : user._id},user);  
        }else{
            result = await User.updateOne({_id : req.userId},user);
        }

        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }

}

const deleteGame = async(req,res) =>{

    try {
        
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
        }
        const {item} = req.body;
        // console.log(item);
        let user;
        if(req.email){
            user = await User.find({'email' : req.email});  
            user=user[0];
        }else{
            user = await User.findOne({_id : req.userId});
        }
       
        const games = user.games;
        // console.log(games);
        const finalGames=games.filter((game)=> game.id!==item.id);
        // console.log(finalGames);
        user.games=finalGames;
        // console.log(user);
        let result;
        if(req.email){
            result = await User.updateOne({_id : user._id},user);  
        }else{
            result = await User.updateOne({_id : req.userId},user);
        }

        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }

}

const updateFavouriteTeam = async (req,res) => {
    try {
        
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
        }
        const {favouriteTeam} = req.body;
        // console.log(favouriteTeam);
        let user;
        if(req.email){
            user = await User.find({'email' : req.email});  
            user=user[0];
        }else{
            user = await User.findOne({_id : req.userId});
        }
        
        user.favouriteTeam=favouriteTeam;
        
        let result;
        if(req.email){
            result = await User.updateOne({_id : user._id},user);  
        }else{
            result = await User.updateOne({_id : req.userId},user);
        }

        res.status(200).json(result);
    } catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }
}

const deleteUser = async (req,res) => {
    try{
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
        }

        let user;
        if(req.email){
            user = await User.find({'email' : req.email});  
            user=user[0];
        }else{
            user = await User.findOne({_id : req.userId});
        }

        // console.log(user);
        let result;
        if(req.email){
            result = await User.deleteOne({_id : user._id});  
        }else{
            result = await User.deleteOne({_id : req.userId});
        }
        // console.log(result);
        res.status(200).json(result);

    } catch(error){
        res.status(500).json({message:'Something went wrong.'})
    }
} 

const leaderBoard = async (req,res) => {
    const users = await User.find();
    // console.log(users);
    res.status(200).json(users);
}

module.exports = {signin,signup,googleLogin,getUser,leaderBoard,updateGames,updateFavouriteTeam,deleteUser,deleteGame}