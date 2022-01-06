const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const authService=require("../service/auth.service")
const {md5password} = require("../utils/password-handle");
const jwt=require('jsonwebtoken')
const {PUBLIC_KEY} = require("../app/config");

const verifyLogin=async (ctx,next)=>{
    // 获取用户名和密码
    const {name,password}=ctx.request.body
    // 判断用户名与密码是否为空
    if (!name || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户是否存在
    const result=await userService.getUserByName(name)
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

    ctx.user=user

    await next()
}

const verifyAuth=async (ctx,next)=>{
    console.log('验证授权的middleware')
    // 获取token
    const authorization=ctx.headers.authorization
    if(!authorization){
        const error=new Error(errorTypes.UNAUTHORIZED)
        return ctx.app.emit('error',error,ctx)
    }
    const token=authorization.replace('Bearer ','')
    // 验证token(id/name/iat/exp)
    try{
        ctx.user=await jwt.verify(token,PUBLIC_KEY,{
            algorithms:['RS256']
        })
        await next()
    }catch (e) {
        const error=new Error(errorTypes.UNAUTHORIZED)
        return ctx.app.emit('error',error,ctx)
    }
}

const verifyPermission=(tableName)=>{
    return async (ctx,next)=>{
        // 获取参数
        const {id}=ctx.params
        const {id:userId}=ctx.user
        // 查询是否具备权限
        try{
            const isPermitted=await authService.checkPermission(id,userId,tableName)
            if(!isPermitted) throw new Error()
            await next()
        }catch (e) {
            const error=new Error(errorTypes.UNPERMITTED)
            return ctx.app.emit('error',error,ctx)
        }
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission,
}
