class AuthController{
    async login(ctx,next){
        const {name}=ctx.request.body
        ctx.body=`${name}, 欢迎回来`
        await next()
    }
}

module.exports = new AuthController()
