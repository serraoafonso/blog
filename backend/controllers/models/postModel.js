const express = require('express');
const connection = require('./connection');

const getAll = async()=>{
    const posts = await connection.execute('SELECT * FROM POSTS');
    console.log(posts)
}

module.exports = {
    getAll
}