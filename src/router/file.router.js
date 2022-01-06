const Router=require('koa-router')
const controller=require('../controller/file.controller')
const {verifyAuth} = require("../middleware/auth.middleware");
const {avatarUploadHandler} = require("../middleware/file.middleware");

const fileRouter=new Router({prefix:'/upload'})

fileRouter.post('/avatar',verifyAuth,avatarUploadHandler,controller.saveAvatarInfo)

module.exports = fileRouter
