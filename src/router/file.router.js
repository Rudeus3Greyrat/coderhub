const Router=require('koa-router')
const controller=require('../controller/file.controller')
const {verifyAuth} = require("../middleware/auth.middleware");
const {avatarUploadHandler, pictureUploadHandler,pictureResize} = require("../middleware/file.middleware");

const fileRouter=new Router({prefix:'/upload'})

fileRouter.post('/avatar',verifyAuth,avatarUploadHandler,controller.saveAvatarInfo)
fileRouter.post('/picture',verifyAuth,pictureUploadHandler,pictureResize,controller.savePictureInfo)

module.exports = fileRouter
