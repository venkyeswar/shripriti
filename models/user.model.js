const bcrypt=require('bcryptjs');
const db=require('../data/database');

class User{
    constructor(enteredData){
        this.name=enteredData.name;
        this.email=enteredData.email;
        this.confirmEmail=enteredData.confirmEmail;
        this.password=enteredData.password;
        this.confirmPassword=enteredData.confirmPassword;
    }

    // EXISTING USER finding Function
    async existingUser(){
       return await db.getDb().collection('users').findOne({email:this.email});
       
    }

   
   // NEW USER signup Function
    async newUser(){
        const hashedPassword=await bcrypt.hash(this.password,12);
        const userData={
            name:this.name,
            email:this.email,
            password:hashedPassword

        }
        return await db.getDb().collection('users').insertOne(userData);
    }

    // function To check Passwords
    passwordsAreEqual(hashedPassword){
        
        return bcrypt.compare(this.password,hashedPassword);
    }

}


module.exports=User;