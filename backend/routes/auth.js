const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')

router.get('/' , (req,res)=>{
    res.send('Authorization');
})

//create a new User
router.post('/createUser', [
    body('email' , "Enter a valid email").isEmail(),
    body('name', "Enter a valid name").isLength({min : 3}),
    body('password').isLength({min : 5})
], async (req,res)=>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors : result.array()});
    }
    let  user = await User.findOne({email : req.body.email})

    let salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password , salt);
    

    if(!user){
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass,
           })
           var data = {
            user : {
                id : User.id
            }
            }
        var token = jwt.sign(data, 'Mysecret');
           res.send({success : true,token})
    }else{
        res.json({success : false,error : 'Enter a unique email'})
    }   
})

//login a user
router.post('/loginUser',[
    body('email' , "Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists()
],async (req,res) =>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors : result.array()});
    }
    

        
    try{

        let user = await User.findOne({email : req.body.email})
        if(!user){
            res.status(400).json({success : false,error : 'Enter Correct Credentials'})
        }else{
            bcrypt.compare(req.body.password,user.password,(err,data)=>{
                if(err){
                    console.log('error')
                }
                if(data){
                    var data = {
                        user : {
                            id : user.id
                        }
                        }
                    var token = jwt.sign(data, 'Mysecret');
                       res.json({success : true ,token})
                }
                else{
                    res.status(400).json({success : false ,error : 'Enter Correct password'})
                }
            });
           
        }
    }catch(error){
        console.log('ERROR OCCURED')
    }
   

})

//get details of user
router.post('/getDetails',fetchUser, async (req,res)=>{
    try{
        const details = await User.findById(req.user.id).select("-password");
        console.log(details)
        res.send(details)
    }catch(error){
        console.log('ERROR OCCURED')
    }
    
})

module.exports = router;