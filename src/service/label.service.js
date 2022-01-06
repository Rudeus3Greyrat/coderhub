const connection = require('../app/database')

class LabelService{
    async create(name){
        const statement=`INSERT INTO label (name) values (?);`
        const [result]=await connection.execute(statement,[name])
        return result
    }
    async list(offset,size){
        const statement=`SELECT * FROM label LIMIT ?,?;`
        const [result]=await connection.execute(statement,[offset,size])
        return result
    }
    async queryLabel(name){
        const statement=`SELECT * FROM label WHERE name = ?;`
        const [result]=await connection.execute(statement,[name])
        return result[0]
    }
}

module.exports = new LabelService()
