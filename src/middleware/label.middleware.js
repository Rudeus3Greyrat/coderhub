const service=require('../service/label.service')

const verifyLabelExits=async (ctx,next)=>{
    // 取出要添加的所有标签
    const {labels}=ctx.request.body
    const addLabels=[]
    for (const label of labels) {
        const queryLabel=await service.queryLabel(label)
        if(queryLabel) addLabels.push({id:queryLabel.id,name:queryLabel.name})
        else {
            const result=await service.create(label)
            addLabels.push({id:result.insertId,name:label})
        }
    }
    ctx.labels=addLabels
    console.log(ctx.labels)
    await next()
}

module.exports = {
    verifyLabelExits
}
