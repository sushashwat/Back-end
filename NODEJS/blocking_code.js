const getUserSync = (userId) =>{
    const users = {
        1: {name:"John", age:35},
        2: {name: "Jane", age:28},  
    };
    return users[userId];
};

const user = getUserSync(1)
console.log(user);
