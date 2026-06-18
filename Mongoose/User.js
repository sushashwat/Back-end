const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true},
    age: {
        type:Number,
        require:true,},
    isAdult: Boolean,
    hobbies: Array,
});

module.exports = mongoose.model("User", userSchema);

// users 