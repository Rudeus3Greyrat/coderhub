const errorTypes = require("../constants/error-types");
const errorHandler=(error,ctx)=>{
    let status
    let message
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status=400
            message='用户名或者密码不能为空'
            break
        case errorTypes.USER_ALREADY_EXISTS:
            status=409
            message='用户已经存在'
            break
        case errorTypes.USER_DOES_NOT_EXIST:
            status=400
            message='用户名不存在'
            break
        case errorTypes.PASSWORD_INCORRECT:
            status=400
            message='密码错误'
            break
        case errorTypes.UNAUTHORIZED:
            status=401
            message='token认证失败'
            break
        case errorTypes.UNPERMITTED:
            status=401
            message='不具备权限'
            break
        default:
            status=404
            message='Not Found'
    }
    ctx.status=status
    ctx.body=message
}

module.exports = errorHandler
