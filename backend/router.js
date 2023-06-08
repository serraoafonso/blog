const express = require('express')
const { getAll, postAll } = require('./controllers/postsController')
const router = express.Router()

router.get('/posts',getAll)
router.post('/posts', postAll)
router.put('posts/:post_id')
router.delete('posts/:post_id')

module.exports= router