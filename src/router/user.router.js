const controller=require('../controller/user.controller')

const {verifyUser,handlePassword} = require("../middleware/user.middleware");

const Router=require('koa-router')

const userRouter=new Router({prefix:'/users'})

userRouter.post('/',verifyUser,handlePassword,controller.create)
userRouter.get('/:id/avatar',controller.avatarInfo)

module.exports = userRouter
