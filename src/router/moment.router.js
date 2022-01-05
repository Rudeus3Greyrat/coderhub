const controller=require('../controller/moment.controller')
const {verifyAuth,verifyPermission} = require("../middleware/auth.middleware");

const Router=require('koa-router')

const momentRouter=new Router({prefix:'/moment'})

momentRouter.post('/',verifyAuth,controller.create)
momentRouter.get('/:momentId',controller.detail)
momentRouter.get('/',controller.list)
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,controller.update)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,controller.remove)

module.exports = momentRouter
