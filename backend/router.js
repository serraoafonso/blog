const express = require('express')
const { getAll, postAll, deletePost, editPost } = require('./controllers/postsController')

const router = express.Router()

router.get('/posts',getAll)
router.post('/posts', postAll)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', editPost )

module.exports= router