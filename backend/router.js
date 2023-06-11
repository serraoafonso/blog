const express = require('express')
const { getAll, postAll, deletePost, editPost, logOut,getUsername } = require('./controllers/postsController')

const router = express.Router()

router.delete('/posts/logout', logOut)
router.get('/posts/username',getUsername)
router.get('/posts',getAll)
router.post('/posts', postAll)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', editPost );


module.exports= router