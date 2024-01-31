const express=require('express');
const path=require('path');

// const expressSession=require('express-session');
// const createSessionConfig=require('./config/session');



const checkAuthMiddleware=require('./middlewares/checkAuth')


const db=require('./data/database');
const routes=require('./routes/user.routes');


const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

// app.use(expressSession(createSessionConfig()));

// app.use(checkAuthMiddleware);
// app.use(csrf());

app.use(routes);
let port=3003;

if(process.env.PORT){
    port=process.env.PORT;
}
db.connectToDatabase().then(function(){
    app.listen(port);
});