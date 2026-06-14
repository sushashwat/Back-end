const getUserAsync = (userId,callback) =>{
    const users = {
        1:{name: "John", age:35},
        2:{name: "Jane", age:28},
    };
    setTimeout(()=>{
        callback(users[userId]);
    }, 5000);
};  
getUserAsync(1,(user)=> {
    console.log(user);
});