const express=require('express');
const path=require('path');

const session=require('express-session');
const mongodbStore=require('connect-mongodb-session');
// const csrf=require('csurf');


const checkAuthMiddleware=require('./middlewares/checkAuth')


const db=require('./data/database');
const routes=require('./routes/user.routes');
const MongoDbStore=mongodbStore(session);


const app=express();
const sessionStore=new MongoDbStore({
    uri:'mongodb+srv://venkyeswar:7112001746@cluster0.qpo13la.mongodb.net/?retryWrites=true&w=majority',
    databaseName:'shripriti',
    collection:'sessions'
});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'super-secret',
    resave:false,
    saveUninitialized:false,
    store:sessionStore
}));

// app.use(checkAuthMiddleware);


app.use(routes);
let port=3003;

if(process.env.PORT){
    port=process.env.PORT;
}
db.connectToDatabase().then(function(){
    app.listen(port);
});