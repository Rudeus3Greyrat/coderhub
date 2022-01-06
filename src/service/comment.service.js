const connection = require('../app/database')

class CommentService {
    async create(userId, content,momentId) {
        const statement = `INSERT INTO comment (content, user_id,moment_id)
                           values (?, ?, ?);`
        const [result] = await connection.execute(statement, [content, userId,momentId])
        return result
    }
    async reply(userId, content,momentId,commentId) {
        const statement = `INSERT INTO comment (content, user_id,moment_id,comment_id)
                           values (?, ?, ?,?);`
        const [result] = await connection.execute(statement, [content, userId,momentId,commentId])
        return result
    }
    async update(content,commentId) {
        const statement = `UPDATE comment SET content = ? WHERE id = ?;`
        const [result] = await connection.execute(statement, [content,commentId])
        return result
    }
    async remove(commentId) {
        const statement = `DELETE FROM comment WHERE id = ?;`
        const [result] = await connection.execute(statement, [commentId])
        return result
    }
}

module.exports = new CommentService()
