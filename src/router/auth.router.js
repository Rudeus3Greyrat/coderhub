const controller=require('../controller/auth.controller')

const Router=require('koa-router')
const {verifyLogin} = require("../middleware/auth.middleware");

const authRouter=new Router()

authRouter.post('/login',verifyLogin,controller.login)

module.exports = authRouter
