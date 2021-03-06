const service=require('../service/moment.service')
const fileService=require("../service/file.service")
const fs = require("fs");
const {PICTURE_PATH} = require("../app/config");

const SIZES=['small','medium','large']

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
        const {labels}=ctx
        const {id:momentId}=ctx.params
        for(const label of labels){
            const isExist=await service.hasLabel(momentId,label.id)
            if(!isExist){
                await service.addLabel(momentId,label.id)
            }
        }
        ctx.body=`给动态添加标签成功~`
    }
    async getFileByName(ctx,next){
        let {filename}=ctx.params
        const {size}=ctx.query
        const result=await fileService.getFileByName(filename)
        const {mimetype}=result
        if(SIZES.some(val=>val===size)) filename+=`-${size}`
        ctx.response.set('content-type',mimetype)
        ctx.body=fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MomentController()
