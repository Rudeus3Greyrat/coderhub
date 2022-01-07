const {AVATAR_PATH,PICTURE_PATH}=require("../app/config")
const Jimp=require('jimp')

const Multer=require('koa-multer')
const path = require("path");
const avatarUpload= Multer({
    dest:AVATAR_PATH
})
const pictureUpload= Multer({
    dest:PICTURE_PATH
})

const avatarUploadHandler=avatarUpload.single('avatar')

const pictureUploadHandler=pictureUpload.array('picture',9)

const pictureResize=async (ctx,next)=>{
    // 获取所有图像信息
    const files=ctx.req.files
    // 对图像进行处理
    for (let file of files) {
        console.log(file)
        const filePath=path.join(file.destination,file.filename)
        Jimp.read(file.path).then(image=>{
            image.resize(1280,Jimp.AUTO).write(`${filePath}-large`)
            image.resize(640,Jimp.AUTO).write(`${filePath}-medium`)
            image.resize(320,Jimp.AUTO).write(`${filePath}-small`)
        })
    }
    await next()
}

module.exports = {
    avatarUploadHandler,
    pictureUploadHandler,
    pictureResize
}
