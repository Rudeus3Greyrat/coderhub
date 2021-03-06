const connection=require('../app/database')

class UserService{
    // 将用户信息存入数据库中
    async create(user){
        console.log(`将用户数据保存到数据库中：`,user)
        const {name,password}=user
        const statement=`INSERT INTO user (name,password) VALUES (?,?);`
        const result=await connection.execute(statement,[name,password])
        return result[0]
    }

    async getUserByName(name){
        const statement=`SELECT * FROM user WHERE name = ?;`
        const result=await connection.execute(statement,[name])
        return result[0]
    }

    async updateAvatarById(avatarUrl,userId){
        const statement=`UPDATE user SET avatar_url = ? WHERE id = ?;`
        const result=await connection.execute(statement,[avatarUrl,userId])
        return result
    }
}

module.exports = new UserService()
