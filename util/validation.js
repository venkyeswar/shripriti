function isValid(enteredData){
    const data=enteredData;
    const name=data.name;
    const email=data.email;
    const confirmEmail=data.confirmEmail;
    const password=data.password;
    const confirmPassword=data.confirmPassword;

    if(!name ||
        !email ||
        !confirmEmail ||
        !password ||
        !confirmPassword ||
        email !== confirmEmail ||
        password !== confirmPassword ||
        password.trim().length<6){
         return false;
        }

        return true;
        
}

module.exports={
    isValid:isValid
}