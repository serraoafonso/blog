const express = require('express');
const router = require('./router');
const app = express()
const cors = require('cors')
const port = 3000;

app.use(express.json())
app.use(cors())
app.use(router)


app.listen(port, ()=>console.log(`Rodando na porta ${port}`))