const connection = require("../app/database");

class AuthService{
    async checkPermission(id,userId,tableName){
        const statement= `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
        const result = await connection.execute(statement, [id, userId])
        console.log(result[0])
        return result[0].length
    }
}

module.exports = new AuthService()
