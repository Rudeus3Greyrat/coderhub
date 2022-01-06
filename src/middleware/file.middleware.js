const {AVATAR_PATH}=require("../app/config")

const Multer=require('koa-multer')
const avatarUpload= Multer({
    dest:AVATAR_PATH
})

const avatarUploadHandler=avatarUpload.single('avatar')

module.exports = {
    avatarUploadHandler
}
