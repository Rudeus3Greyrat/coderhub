const controller=require('../controller/auth.controller')

const Router=require('koa-router')
const {verifyLogin,verifyAuth} = require("../middleware/auth.middleware");

const authRouter=new Router()

authRouter.post('/login',verifyLogin,controller.login)
authRouter.get('/test',verifyAuth,controller.success)

module.exports = authRouter
