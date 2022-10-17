const express = require('express')
const mysql = require('mysql2')
const routes = express.Router()
const cors = require('cors');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: "",
    database: 'challenge'
})

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
}

routes.get('/', (req, res)=> {
    res.set('Access-Control-Allow-Origin', '*')
    try {
        connection.query(
            'SELECT * FROM orders',
            function(err, results, fields) {
                if(err) return res.send(err)
                res.json(results)
            }
        );
    } catch (error) {
        console.log(error)
    }   
})

routes.post('/', cors(corsOptions), (req, res)=> {    
    try {
        connection.query(
            'INSERT INTO orders SET total=?', [req.body.orderTotal], (err, results, fields) => {
                if(err) return res.send(err)
                let idOrder = results.insertId

                req.body.items.forEach(element => {
                    try {
                        connection.query(
                            'INSERT INTO `order-item` SET `id-order`=?, `pizza`=?, `qty`=?',[idOrder, element.pizza, element.qty] ,(err, results, fields) => {
                                if(err) return res.send(err)
                                
                            }
                        );
                    } catch (error) {
                        console.log(error)
                    }
                });

                res.json(idOrder);
            }
        );

    } catch (error) {
        console.log(error)
    }
})

routes.get('/:id', (req, res)=> {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        connection.query(
            'SELECT * FROM `order-item` WHERE `id-order` = ?', [req.params.id], (err, results, fields) => {
                if(err) return res.send(err)
                res.json(results)
            }
        );

    } catch (error) {
        console.log(error)
    }   
})

module.exports = routes