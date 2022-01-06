const connection = require('../app/database')

class CommentService {
    async create(userId, content,momentId) {
        const statement = `INSERT INTO comment (content, user_id,moment_id)
                           values (?, ?, ?);`
        const [result] = await connection.execute(statement, [content, userId,momentId])
        return result
    }
}

module.exports = new CommentService()
