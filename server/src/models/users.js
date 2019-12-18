const {Schema , model} = require('mongoose');

const userSchema = new Schema({
    email : {
        type : String,
        unique : true
    },
    password : String
})

module.exports = model('Users' , userSchema)