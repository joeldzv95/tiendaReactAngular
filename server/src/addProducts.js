const express = require('express');
const mongoose = require('mongoose');
const productsModel = require('./models/products.js')


const app = express();

mongoose.connect('mongodb://localhost/tienda')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err))

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log(`Sever on port ${app.get('port')}`);
});


var Users =  [{name : 'aguacate', price : 5 , uDis : 46},
{name : 'ajo' , price : 2 , uDis : 100},
{name : 'almendras' , price : 10 , uDis : 50},
{name : 'arandanos' , price : 3 , uDis : 30},
{name : 'brocoli' , price : 10 , uDis : 25},
{name : 'calabaza' , price : 8 , uDis : 10},
{name : 'canela' , price : 1 , uDis : 200},
{name : 'cebolla' , price : 2 , uDis : 30},
{name : 'fresa' , price : 10 , uDis : 20} ];

productsModel.collection.insert(Users , function(err,docs){
    if (err) {
        return console.log(err)
    }else{
        console.log('Insert')
    }
})
