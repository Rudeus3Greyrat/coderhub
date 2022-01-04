const controller=require('../controller/user.controller')

const {verifyUser} = require("../middleware/user.middleware");

const Router=require('koa-router')

const userRouter=new Router({prefix:'/users'})

userRouter.post('/',verifyUser,controller.create)

module.exports = userRouter
