
const expressSession=require('express-session');
const mongoDbStore=require('connect-mongodb-session');


function createSessionStore(){
    const MongoDbStore=mongoDbStore(expressSession);
    const store=new MongoDbStore({
        url:'mongodb://0.0.0.0',
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