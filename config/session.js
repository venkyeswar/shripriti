
const expressSession=require('express-session');
const mongoDbStore=require('connect-mongodb-session');


function createSessionStore(){
    const MongoDbStore=mongoDbStore(expressSession);
    const store=new MongoDbStore({
        url:'mongodb+srv://venkyeswar2037:7112001Venky@shripriti.gize4ik.mongodb.net/?retryWrites=true&w=majority',
        database:'shripriti',
        collection:'sessions',
    });
    return store;

}

function createSessionConfig(){
    return {
         secret:'super-secret',
         resave:false,
         saveUninitialized:false,
         store:createSessionStore(),
        
    };
}


module.exports=createSessionConfig;
