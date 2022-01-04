const errorTypes = require("../constants/error-types");
const service=require('../service/user.service');

const verifyUser=async (ctx, next) => {
    // 获取用户名与密码
    const {name, password} = ctx.request.body
    // 判断用户名或密码不为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户名有没有注册过
    const result=await service.getUserByName(name)
    console.log(result);
    if(result.length){
        const error = new Error(errorTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

module.exports = {
    verifyUser
}
