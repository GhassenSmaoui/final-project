const express = require('express')
const {  register,login,getAuthUser, addSkill, registerCom, loginCom, getAuthCompany } = require('../controllers/authController')
const { validator, authRules,authRulesCom, loginRules } = require('../mddlewares/bodyValidator')
const isAuth = require('../mddlewares/isAuth')
const isAuthCom = require('../mddlewares/isAuthCom')

const router = express.Router()

router.post('/registerCompany',authRulesCom(), validator,registerCom)
router.post('/loginCompany',loginRules(), validator,loginCom)
router.get('/company',isAuthCom,getAuthCompany)

router.post('/register',authRules(), validator,register)
router.post('/login',loginRules(), validator,login)
router.get('/me',isAuth,getAuthUser)
router.put('/add',isAuth, addSkill)


module.exports= router