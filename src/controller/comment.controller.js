const service=require('../service/comment.service')

class CommentController{
    async list(ctx,next){
        // 获取数据(momentId)
        const {momentId}=ctx.query
        // 查询数据库
        const result=await service.list(momentId)
        ctx.body=result
        await next()
    }
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
    async reply(ctx,next){
        // 获取数据(user_id,content)
        const userId=ctx.user.id
        const {momentId,content}=ctx.request.body
        const {id}=ctx.params.id
        ctx.body='发表评论成功～'
        // 将数据插入到数据库
        const result=await service.reply(userId,content,momentId,id)
        ctx.body=result
        await next()
    }
    async update(ctx,next){
        // 获取数据(commentId,content)
        const {content}=ctx.request.body
        const {id}=ctx.params
        // 将数据插入到数据库
        const result=await service.update(content,id)
        ctx.body=result
        await next()
    }
    async remove(ctx,next){
        // 获取数据(commentId,content)
        const {id}=ctx.params
        // 将数据插入到数据库
        const result=await service.remove(id)
        ctx.body=result
        await next()
    }
}

module.exports = new CommentController()
