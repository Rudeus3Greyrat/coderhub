const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const {md5password} = require("../utils/password-handle");
const verifyLogin=async (ctx,next)=>{
    // 获取用户名和密码
    const {name,password}=ctx.request.body
    // 判断用户名与密码是否为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户是否存在
    const result=await service.getUserByName(name)
    const user=result[0]
    if(!user){
        const error = new Error(errorTypes.USER_DOES_NOT_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断密码是否一致
    if(md5password(password)!==user.password){
        const error = new Error(errorTypes.PASSWORD_INCORRECT)
        return ctx.app.emit('error', error, ctx)
    }

    await next()
}

module.exports = {
    verifyLogin
}
