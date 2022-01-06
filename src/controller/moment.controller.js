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
        const {id}=ctx.params
        // 查询数据
        const result=await service.getMomentById(id)
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
        const {id}=ctx.params
        const {content}=ctx.request.body
        const result=await service.update(id,content)
        ctx.body=result
    }
    async remove(ctx,next){
        const {id}=ctx.params
        const result=await service.remove(id)
        ctx.body=result
    }
    async addLabels(ctx,next){
        const {labels}=ctx.request.body
        ctx.body=labels
    }
}

module.exports = new MomentController()
