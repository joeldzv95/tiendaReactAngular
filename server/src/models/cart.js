const {Schema , model} = require('mongoose');

const cartSchema = new Schema({
    id : String,
    idUser : String,
    titulo : String,
    precio : String, 
    cantidad : String
})

module.exports = model('Cart' , cartSchema)