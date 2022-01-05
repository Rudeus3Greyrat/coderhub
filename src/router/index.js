const fs=require('fs')

const useRouter=function (){
    fs.readdir(__dirname,(err,files)=>{
        files.forEach(file=>{
            if(file==='index.js') return
            const router=require(`./${file}`)
            this.use(router.routes())
            this.use(router.allowedMethods())
        })
    })
}

module.exports = useRouter
