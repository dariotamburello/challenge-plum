const express = require('express')
const mysql = require('mysql2')
const routes = express.Router()

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: "",
    database: 'challenge'
})

routes.get('/', (req, res)=> {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        connection.query(
            'SELECT * FROM pizzas',
            function(err, results, fields) {
                if(err) return res.send(err)
                res.json(results)
            }
        );
    } catch (error) {
        console.log(error)
    }   
})

module.exports = routes