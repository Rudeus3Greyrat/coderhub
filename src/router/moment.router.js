const controller=require('../controller/moment.controller')
const {verifyAuth} = require("../middleware/auth.middleware");

const Router=require('koa-router')

const momentRouter=new Router({prefix:'/moment'})

momentRouter.post('/',verifyAuth,controller.create)

module.exports = momentRouter
