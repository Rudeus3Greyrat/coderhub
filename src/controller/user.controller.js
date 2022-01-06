const service=require('../service/user.service')
const fileService=require("../service/file.service")
const fs = require("fs");
const {AVATAR_PATH,APP_HOST,APP_PORT}=require("../app/config")

class UserController {
    async create(ctx, next) {
        // 获取传来的用户信息
        const user=ctx.request.body
        // 查询数据
        const result=await service.create(user)
        // 返回数据
        ctx.body=result
    }
    async avatarInfo(ctx,next){
        const {id:userId}=ctx.params
        const result = await fileService.getAvatarByUserId(userId)
        ctx.response.set("content-type",result.mimetype)
        ctx.body=fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
    }
}

module.exports = new  UserController()
