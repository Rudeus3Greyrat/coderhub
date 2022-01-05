const connection = require('../app/database')

class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content, user_id)
                           values (?, ?);`
        const result = await connection.execute(statement, [content, userId])
        return result
    }

    async getMomentById(momentId) {
        const statement = `SELECT m.id       id,
                                  m.content  content,
                                  m.createAt createTime,
                                  m.updateAt updateTime,
                                  JSON_OBJECT('id', u.id, 'name', u.name) author
                           FROM
                               moment m
                               LEFT JOIN user u
                           on u.id = m.user_id
                           WHERE m.id=?;`
        const [result] = await connection.execute(statement, [momentId])
        return result[0]
    }
}

module.exports = new MomentService()
