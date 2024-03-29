const validation=require('../util/validation');
const error=require('../util/validation.session');
const User=require('../models/user.model');

// GET HOME function
async function getHome(req,res){
    let user=req.session.user;
    if(!user){
        user={
            name:''
        }
    }
    res.render('home',{user:user});
}

// GET LOGIN function
function getLogin(req,res){
    let loginData=req.session.loginData;
    if(!loginData){
        loginData={
            hasError:false,
            name:"",
            email:""
        }
    }
    req.session.loginData=null;
    const csrfToken=req.csrfToken();
    res.render('./user/login',{loginData:loginData,csrfToken:csrfToken});
}

// GET SIGNUP function
function getSignup(req,res){

    let data=req.session.signupData;

    if(!data){
        data={
            hasError:false,
            message:"",
            name:"",
            email:"",
            confirmEmail:"",
            password:"",
            confirmPassword:""
        }   
    }
    req.session.signupData=null;
    const csrfToken=req.csrfToken();
    res.render('./user/signup',{data:data,csrfToken:csrfToken});
}

// GET LOGOUT function
async function getLogout(req,res){
    req.session.user=null;
    req.session.isAuthenticated=false;
    res.redirect('/');
}

//POST SIGNUP function
async function postSignup(req,res){
    const userData=req.body;
    const user=new User({...userData});
   const valid=validation.isValid(userData);  

  if(!valid){
    req.session.signupData=error.errorData(userData,errorMessage="Check the Inpus Once !");
    req.session.save(function(){
        return res.redirect('/signup');
    });
    return;   
  }

const existingUser=await user.existingUser();


if(existingUser){
    req.session.signupData=error.errorData(userData,errorMessage="User Exists Already !");
    req.session.save(function(){
        return res.redirect('/signup');
    });
    return;
}
user.newUser();
res.redirect('/login');

}

// POST LOGIN function
async function postLogin(req,res){
    const enteredData=req.body;
    
const user=new User({...enteredData});
const existingUser=await user.existingUser();
    if(!existingUser){
        req.session.loginData=error.errorData(enteredData,errorMessage="Check the Inputs Once");
        req.session.save(function(){
            return res.redirect('/login');
        });
        return;
    }

const passwordsAreEqual=await user.passwordsAreEqual(existingUser.password);

if(!passwordsAreEqual){
    req.session.loginData=error.errorData(enteredData,errorMessage="Wrong Password");
    req.session.save(function(){
        return res.redirect('/login');
    });
    return;
}

req.session.user={
    uid:existingUser._id.toString(),
    name:existingUser.name,
    email:existingUser.email,
    password:existingUser.password
}
req.session.isAuthenticated=true;
req.session.save(function(){
    return res.redirect('/');
});
}



module.exports={
    getHome:getHome,
    getLogin:getLogin,
    getSignup:getSignup,
    getLogout:getLogout,
    postSignup:postSignup,
    postLogin:postLogin
    
}