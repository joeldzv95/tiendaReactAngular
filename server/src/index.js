const express = require('express');
const app = express();
const Router = require('./routes/index.js');
const cors = require('cors');

//Conect database

require('./database.js');

//config cors
app.use(cors());

//settings

app.set('port', process.env.PORT || 4000);

//middleawes
app.use(express.json());

//routes

app.use('/api', Router);

//start server


app.listen(app.get('port'), ()=>{
    console.log(`Sever on port ${app.get('port')}`);
});
