const connection = require('../app/database')

const sqlFragment = `
    SELECT m.id                                    id,
           m.content                               content,
           m.createAt                              createTime,
           m.updateAt                              updateTime,
           JSON_OBJECT('id', u.id, 'name', u.name,'avatar',u.avatar_url) author
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
        const statement = `SELECT m.id                                                                          id,
                                  m.content                                                                     content,
                                  m.createAt                                                                    createTime,
                                  m.updateAt                                                                    updateTime,
                                  JSON_OBJECT('id', u.id, 'name', u.name)                                       author,
                                  (SELECT IF(COUNT(c.id),
                                             JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId',
                                                                       c.comment_id, 'createTime', c.createAt,
                                                                       'updateTime', c.updateAt, 'user',
                                                                       JSON_OBJECT('id', cu.id, 'name', cu.name,'avatar',cu.avatar_url))),
                                             NULL)
                                   FROM comment c
                                            LEFT JOIN user cu on cu.id = c.user_id
                                   WHERE m.id = c.moment_id)                                                    comments,
                                  IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
                                  (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8081/moment/images/',file.filename)) FROM file WHERE file.moment_id = m.id) images
                           FROM moment m
                                    LEFT JOIN user u
                                              on u.id = m.user_id
                                    LEFT JOIN moment_label ml
                                              on m.id = ml.moment_id
                                    LEFT JOIN label l
                                              on ml.label_id = l.id
                           WHERE m.id = ?
                           GROUP BY m.id;`
        try {
            const [result] = await connection.execute(statement, [momentId])
            console.log(result)
            return result[0]
        } catch (e) {
            console.log(e)
        }
    }

    async getMomentList(offset, size) {
        const statement = `
            SELECT m.id                                                             id,
                   m.content                                                        content,
                   m.createAt                                                       createTime,
                   m.updateAt                                                       updateTime,
                   JSON_OBJECT('id', u.id, 'name', u.name)                          author,
                   (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id)        commentCount,
                   (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount,
                   (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8081/moment/images/',file.filename)) FROM file WHERE file.moment_id = m.id) images
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

    async hasLabel(momentId, labelId) {
        const statement = `SELECT *
                           FROM moment_label
                           WHERE moment_id = ?
                             AND label_id = ?;`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result.length !== 0
    }

    async addLabel(momentId, labelId) {
        const statement = `INSERT INTO moment_label (moment_id, label_id)
                           VALUES (?, ?);`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result.length !== 0
    }
}

module.exports = new MomentService()
