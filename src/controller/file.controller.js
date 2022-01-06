const service=require("../service/file.service")
const userService=require("../service/user.service")
const {APP_HOST, APP_PORT} = require("../app/config");
class FileController{
   async saveAvatarInfo(ctx,next){
      const {id:userId}=ctx.user
      // 获取图像相关信息
      const {mimetype,filename,size}=ctx.req.file
      // 将图像信息保存到数据库
      await service.createAvatar(filename,mimetype,size,userId)
      // 将图片地址保存到user表中
      const avatarUrl=`${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
      await userService.updateAvatarById(avatarUrl,userId)
      ctx.body=`上传头像成功~`
   }
}

module.exports = new FileController()
