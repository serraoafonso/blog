const connection = require('./connection');



const getAll = async()=>{
    const posts = await connection.execute('select p.title_posts, desc_posts,  p.posted_at_posts, p.idposts_posts, u.username_users from posts p inner join users u on p.idusers_posts = u.id_users;');//para tambem tirar o username
    return posts[0]
}

const getUsername = async()=>{
  const rows = await connection.execute('SELECT username FROM currentuser WHERE id=1');
  const username = rows[0][0].username;
  return username
}

const logOut = async()=>{
    const rows = await connection.execute("UPDATE currentuser SET username='' WHERE id=1");
    return rows
}

const getId = async()=>{
    const rows = await connection.execute('SELECT id_users FROM users WHERE username_users = ?', [await getUsername()])
    const idUser =  rows[0][0].id_users
    return idUser
}

const makePost = async(post)=>{
    const idUser = await getId();
    const {title, desc} = post
    const query = 'INSERT INTO posts(title_posts, desc_posts, idusers_posts) VALUES (?, ?, ?)'
    const createdPost  = await connection.execute(query, [title, desc, idUser])    //pega o primeiro valor
    return {message: 'Post created'};
}

const deletePost = async(id)=>{
    await connection.execute('DELETE FROM posts WHERE idposts_posts = ?', [id])
}

const editPost = async(id, body)=>{
    const {title, desc} = body
    const updateTask = await connection.execute('UPDATE posts SET title_posts = ?, desc_posts = ? WHERE idposts_posts = ?', [title, desc, id])
    return updateTask
}




module.exports = {
    getAll,
    makePost,
    deletePost,
    editPost,
    logOut,
    getUsername
}