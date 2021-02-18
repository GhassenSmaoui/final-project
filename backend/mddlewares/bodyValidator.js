const { body, validationResult } = require('express-validator');

const authRules=()=>[
    body('name',"the name is required").notEmpty(),
    body('lastName',"the last name is required").notEmpty(),
    body('email',"the email  is not valid").isEmail(),
    body('password',"the password should be at least 6 characters is required").isLength({min:6, max : 20})


]
const authRulesCom=()=>[
    body('name',"the name is required").notEmpty(),
    
    body('email',"the email  is not valid").isEmail(),
    body('password',"the password should be at least 6 characters is required").isLength({min:6, max : 20})


]
const loginRules =()=> [
    body('email',"the email  is not valid").isEmail(),
    body('password',"the password should be at least 6 characters is required").isLength({min:6, max : 20})

]

const validator = (req,res,next)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array().map(err=>({msg:err.msg})) );
    }else {
        next()
    }
}

module.exports= {authRules, loginRules, validator, authRulesCom}