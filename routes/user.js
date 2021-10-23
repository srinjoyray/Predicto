const express = require('express');

const {signin,signup,getUser, leaderBoard, googleLogin,updateFavouriteTeam, updateGames, deleteUser,deleteGame} = require('../controllers/user.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post('/googlelogin',googleLogin)

router.get('/profile',auth,getUser);
router.get('/leaderboard',leaderBoard);

router.patch('/updateGames',auth,updateGames);
router.patch('/updateFavouriteTeam',auth,updateFavouriteTeam);

router.patch('/deleteGame',auth,deleteGame);

router.delete('/deleteUser',auth,deleteUser);

module.exports = router;