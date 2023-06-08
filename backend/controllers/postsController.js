const postsModel = require('../models/postModel')

const getAll = async(req, res)=>{
    const posts = await postsModel.getAll()
    const username = await postsModel.getId()
    return res.status(200).json(username)
    
}

const postAll = async()=>{

}

module.exports = {
    getAll,
    postAll
}