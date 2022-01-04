const errorTypes = require("../constants/error-types");
const errorHandler=(error,ctx)=>{
    let status=404
    let message=''
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status=400
            message='用户名或者密码不能为空'
            break
        case errorTypes.USER_ALREADY_EXISTS:
            status=409
            message='用户已经存在'
            break
        default:
            status=404
            message='Not Found'
    }
    ctx.status=status
    ctx.body=message
}

module.exports = errorHandler
