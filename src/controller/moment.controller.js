const service=require('../service/moment.service')

class MomentController{
    async create(ctx,next){
        // 获取数据(user_id,content,image)
        const userId=ctx.user.id
        const content=ctx.request.body.content
        console.log(userId,content)
        ctx.body='发表动态成功～'
        // 将数据插入到数据库
        const result=await service.create(userId,content)
        ctx.body=result
        await next()
    }
    async detail(ctx,next){
        // 获取数据(momentId)
        const momentId=ctx.params.momentId
        // 查询数据
        const result=await service.getMomentById(momentId)
        ctx.body=result
        await next()
    }
    async list(ctx,next){
        // 获取数据(offset,size)
        const {offset,size}=ctx.query
        // 修改内容
        const result=await service.getMomentList(offset,size)
        ctx.body=result
        await next()
    }
    async update(ctx,next){
        const {momentId}=ctx.params
        const {content}=ctx.request.body
        const result=await service.update(momentId,content)
        ctx.body=result
    }
    async remove(ctx,next){
        const {momentId}=ctx.params
        const result=await service.remove(momentId)
        ctx.body=result
    }
}

module.exports = new MomentController()
