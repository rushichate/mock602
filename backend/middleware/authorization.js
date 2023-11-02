const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    const token = req.headers.authorization

    jwt.verify(token,"masai",function(err,decoded){
        if(decoded){
            req.body.userID = decoded.userID
            req.body.username = decoded.username
            next()
        }else{
            res.status(400).json({msg:"Please Login First"})
        }
    })
}

module.exports = {
    auth
}