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
   async savePictureInfo(ctx,next){
      const {id:userId}=ctx.user
      // 获取图像相关信息
      const files=ctx.req.files
      // 获取动态ID
      const {momentId}=ctx.query
      // 将所有图像信息保存到数据库
      for(const file of files){
         const {filename,mimetype,size}=file
         await service.createFile(filename,mimetype,size,userId,momentId)
      }
      // 将图片地址保存到user表中
      // const avatarUrl=`${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
      // await userService.updateAvatarById(avatarUrl,userId)
      ctx.body=`上传文件成功~`
   }
}

module.exports = new FileController()
