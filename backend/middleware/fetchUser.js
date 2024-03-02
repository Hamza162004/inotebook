const jwt = require('jsonwebtoken')

const fetchUser = (req,res,next) =>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:'Send an authorized token'})
    }
    try{
        const data = jwt.verify(token,'Mysecret')
        req.user = data.user;
        next();
    }catch(error){
        console.log('Fetch ERROR OCCURED')
    }  
}

module.exports = fetchUser