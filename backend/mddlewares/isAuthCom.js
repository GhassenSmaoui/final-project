const Company = require('../models/Company')
const jwt = require('jsonwebtoken')


const isAuthCom =async(req,res,next)=>{
    const token = req.headers.authorization
try {
     const decoded = jwt.verify(token, process.env.SECRET);
     
     const company = await Company.findById(decoded.companyId).select("-password")
     if (!company) {
        return res.status(401).json({ msg: "bad credentials" });
      }
      req.company=company
    next()
} catch (error) {
    console.log(error)
}

// console.log(decoded.foo) // bar

}

module.exports = isAuthCom