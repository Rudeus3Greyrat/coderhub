const connection = require("../app/database");

class AuthService{
    async checkMoment(momentId,userId){
        const statement= `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
        const result = await connection.execute(statement, [momentId, userId])
        return result[0].length
    }
}

module.exports = new AuthService()
