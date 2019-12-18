const Router = require('express');
const router = Router();
const User = require('../models/users.js');
const Products = require('../models/products.js');
const Cart = require('../models/cart.js')
const jwt = require('jsonwebtoken');

router.post('/signup' , async (req,res) =>{
    const {email, password} =req.body;
    const newUser = new User({email , password});
    await newUser.save();
    const token = jwt.sign({_id : newUser._id} , 'secretKey');
    res.status(200).json({token});
})

router.post('/signin' , async (req,res) =>{
    console.log(req.body)
    const {email , password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).send('El correo no existe');
    if(user.password != password) return res.status(401).send('Contraseña erronea');

    const token = jwt.sign({_id : user._id},'secretKey');
    return res.status(200).json({token})
})

router.get('/shop'  , verifyToken, async (req,res)=>{
     const products = await Products.find();
     res.json(products);
})

router.post('/shop-update' , async ( req, res) =>{
    const {titulo, cantidad} = req.body;
    const cantidadAct = await Products.findOne({name : titulo})
    var newCant = cantidadAct.uDis - cantidad
    await Products.updateOne({name : titulo} , {uDis : newCant} )
    res.send({ok: 'ok'})
})  


module.exports = router;

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        
        return res.status(401).send('Solicitud no autorizada');
    }
    
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Solicitud no autorizada ')
    }
    const payload = jwt.verify(token ,'secretKey');
    req.userId = payload._id;
    process.env.UserId = payload._id;
    next();
    
}