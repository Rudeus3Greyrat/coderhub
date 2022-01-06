const service=require('../service/comment.service')

class CommentController{
    async create(ctx,next){
        // 获取数据(user_id,content)
        const userId=ctx.user.id
        const {momentId,content}=ctx.request.body
        ctx.body='发表评论成功～'
        // 将数据插入到数据库
        const result=await service.create(userId,content,momentId)
        ctx.body=result
        await next()
    }
}

module.exports = new CommentController()
