const express=require('express');
const router=express.Router();
const user=require('../controller/user.controllers');

router.get('/',user.getHome);
router.get('/login',user.getLogin);
router.get('/signup',user.getSignup);
router.post('/signup',user.postSignup);
router.post('/login',user.postLogin);
router.get('/logout',user.getLogout);

module.exports=router;