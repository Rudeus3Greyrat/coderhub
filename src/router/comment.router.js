const controller=require('../controller/comment.controller')

const Router=require('koa-router')
const {verifyAuth,verifyPermission} = require("../middleware/auth.middleware");

const commentRouter=new Router({prefix:'/comment'})

commentRouter.post('/',verifyAuth,controller.create)
commentRouter.post('/reply/:id',verifyAuth,controller.reply)
commentRouter.patch('/:id',verifyAuth,verifyPermission('comment'),controller.update)
commentRouter.delete('/:id',verifyAuth,verifyPermission('comment'),controller.remove)

module.exports = commentRouter
