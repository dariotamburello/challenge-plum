const express = require('express');
const mysql = require('mysql2')
const cors = require('cors');

const routes_pizzas = require('./routes/routes-pizzas')
const routes_orders = require('./routes/routes-orders')

const app = express();
app.set('port', process.env.PORT || 4000);

app.use(express.json());

app.get('/', (req, res) => {    
    res.json(
        {"Title": "Welcome to api Pizzas"}
    );
})
app.use(cors())
app.use('/api/pizzas', routes_pizzas)
app.use('/api/orders', routes_orders)

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});