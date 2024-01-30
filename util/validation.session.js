function errorData(data,message){
    const errorMessage=message;
    data={
        hasError:true,
        message:errorMessage,
        ...data
    }
    return data;
}

module.exports={
    errorData:errorData
}