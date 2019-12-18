const {Schema , model} = require('mongoose');

const productsSchema = new Schema({
    name : String,
    price: Number,
    uDis : Number
})



var productsModel = model('Products' , productsSchema)

module.exports = productsModel;