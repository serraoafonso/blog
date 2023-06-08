const connection = require('./connection');
const {mudar} = require('../../frontend/script/grabUser')


const getAll = async()=>{
    const posts = await connection.execute('SELECT * FROM posts');
    return posts[0]
}

const getId = async()=>{
    const rows = await connection.execute('SELECT id_users FROM users WHERE username_users = ?', [mudar()])
    return rows[0]
}


module.exports = {
    getAll,
    getId
}