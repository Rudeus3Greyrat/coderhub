const connection = require('../app/database')

const sqlFragment = `
    SELECT m.id                                    id,
           m.content                               content,
           m.createAt                              createTime,
           m.updateAt                              updateTime,
           JSON_OBJECT('id', u.id, 'name', u.name) author
    FROM moment m
             LEFT JOIN user u
                       on u.id = m.user_id`

class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content, user_id)
                           values (?, ?);`
        const result = await connection.execute(statement, [content, userId])
        return result
    }

    async getMomentById(momentId) {
        const statement = `SELECT m.id                                    id,
                                  m.content                               content,
                                  m.createAt                              createTime,
                                  m.updateAt                              updateTime,
                                  JSON_OBJECT('id', u.id, 'name', u.name) author,
                                  JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,'updateTime',c.updateAt,'user',JSON_OBJECT('id', cu.id, 'name', cu.name))) comments
                           FROM moment m
                                    LEFT JOIN user u
                                              on u.id = m.user_id
                                    LEFT JOIN comment c
                                              on c.moment_id = m.id
                                    LEFT JOIN user cu
                                              on cu.id = c.user_id
                           WHERE m.id = 4;`
        const [result] = await connection.execute(statement, [momentId])
        return result[0]
    }

    async getMomentList(offset, size) {
        const statement = `
            SELECT m.id                                                      id,
                   m.content                                                 content,
                   m.createAt                                                createTime,
                   m.updateAt                                                updateTime,
                   JSON_OBJECT('id', u.id, 'name', u.name)                   author,
                   (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
            FROM moment m
                     LEFT JOIN user u
                               on u.id = m.user_id LIMIT ?,?;`
        const [result] = await connection.execute(statement, [offset, size])
        return result
    }

    async update(momentId, content) {
        const statement = `UPDATE moment
                           SET content = ?
                           where id = ?;`
        const [result] = await connection.execute(statement, [content, momentId])
        return result
    }

    async remove(momentId) {
        const statement = `DELETE
                           FROM moment
                           WHERE id = ?;`
        const [result] = await connection.execute(statement, [momentId])
        return result
    }
}

module.exports = new MomentService()
