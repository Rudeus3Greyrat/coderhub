const controller=require('../controller/label.controller')

const Router=require('koa-router')
const {verifyAuth} = require("../middleware/auth.middleware");

const labelRouter=new Router({prefix:'/label'})

labelRouter.post('/',verifyAuth,controller.create)
labelRouter.get('/',verifyAuth,controller.list)

module.exports = labelRouter
