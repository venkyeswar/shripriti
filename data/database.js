const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient;
let mongoDbUrl="mongodb+srv://venkyeswar:7112001746@cluster0.qpo13la.mongodb.net/?retryWrites=true&w=majority";


let database;
async function connect(){
    const client=await MongoClient.connect(mongoDbUrl);
    database=client.db('shripriti');
}

function getDb(){
    if(!database){
        throw{message:"no database is Connected"};
    }
    return database;
}

module.exports={
    connectToDatabase:connect,
    getDb:getDb
}
