const postsModel = require('../models/postModel')

const getAll = async(req, res)=>{
    const posts = await postsModel.getAll()
    return res.status(200).json(posts)
    
}

const postAll = async(req, res)=>{
  const createdPost = await postsModel.makePost(req.body)
  return res.status(201).json(createdPost)
}

const deletePost = async(req, res)=>{
  const {id} = req.params;
  //const id = req.params.id; --> tambem funciona assim
  await postsModel.deletePost(id);
  return res.status(200).json({message: "Deleted task"})
}

const logOut = async(req, res)=>{
  await postsModel.logOut();
  return res.status(200).json({message: "Loged out"})
};

const editPost = async(req, res)=>{
  const {id} = req.params;
  //const id = req.params.id; --> tambem funciona assim
  await postsModel.editPost(id, req.body);
  return res.status(200).json({message: "Updated task"})
}
const getUsername = async(req, res)=>{
  const username = await postsModel.getUsername();
  return res.status(200).json(username)
}

module.exports = {
    getAll,
    postAll,
    deletePost,
    editPost,
    logOut,
    getUsername
}