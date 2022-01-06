const controller=require('../controller/moment.controller')
const {verifyAuth,verifyPermission} = require("../middleware/auth.middleware");

const Router=require('koa-router')

const momentRouter=new Router({prefix:'/moment'})

momentRouter.post('/',verifyAuth,controller.create)
momentRouter.get('/:id',controller.detail)
momentRouter.get('/',controller.list)
momentRouter.patch('/:id',verifyAuth,verifyPermission('moment'),controller.update)
momentRouter.delete('/:id',verifyAuth,verifyPermission('moment'),controller.remove)

module.exports = momentRouter
