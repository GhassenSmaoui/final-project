const User = require('../models/User')
const jwt = require('jsonwebtoken')



 const isAuth =async(req,res,next)=>{
    const token = req.headers.authorization
try {
     const decoded = jwt.verify(token, process.env.SECRET);
     
     const user = await User.findById(decoded.userId).select("-password")
     if (!user) {
        return res.status(401).json({ msg: "bad credentials" });
      }
      req.user=user
    next()
} catch (error) {
    console.log(error)
}

// console.log(decoded.foo) // bar

}


module.exports = isAuth