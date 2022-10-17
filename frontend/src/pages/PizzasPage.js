import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pizza from '../components/Pizza'

const PizzasPage = () => {
    const [pizzas, setPizzas] = useState([])
    const [totalOrder, setTotalOrder] = useState(0)
    const [itemsOrder, setItemsOrder] = useState([])
    const [orderComplete, setOrderComplete] = useState(0)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => { 
        itemsOrder.length > 0 ? setShow(true) : setShow(true)
    }

    useEffect(()=>{
        const urlPizzas = 'http://localhost:4000/api/pizzas'
        const getPizzas = async (urlPizzas) => {
            let res = await fetch(urlPizzas, { mode: 'cors' })
            if (!res.ok) console.log(res.statusText)
            let data = await res.json()
            setPizzas(data)
        }
        getPizzas(urlPizzas)
    },[])

    const addToOrder = (pizza) =>{
        setTotalOrder(totalOrder + Number(pizza.price))
        setItemsOrder([...itemsOrder, {"pizza":pizza.name,"qty":1}])
    }

    const saveOrder = () => {
        handleClose()
        const urlSaveOrder = 'http://localhost:4000/api/orders/'
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*", 
            'Accept':'application/json', 'Access-Control-Allow-Headers': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({"orderTotal" : totalOrder, "items" : itemsOrder})
        }
        fetch(urlSaveOrder, request)
            .then(response => response.text())
            .then(data => finishOrder(data));
    }

    const finishOrder = (orderId) => {
        setTotalOrder(0)
        setItemsOrder([])
        setOrderComplete(orderId)
    }
  return (
    <>  
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <h1>Please select pizzas to your order:</h1>
                    <div className="row">
                        { pizzas.length > 0 ? (
                            pizzas.map((pizza) => (
                                <div className="col-sm-4" style={{display: "flex", justifyContent: "space-around"}} >
                                    <Pizza key={pizza.key} onSelectPizza={addToOrder} {...pizza} />
                                </div>
                            )
                        )):(
                            <p>There aren't pizzas to select, please check your connection to database. </p>
                        )
                        } 
                    </div>
                </div>
                <div className="col-sm-4" style={{position:"fixed", right:"0", margin:"20px 10px 0px 0px"}}>
                    <h2>Total order: ${totalOrder}</h2>
                    { orderComplete === 0 ? (
                        itemsOrder.length > 0 ? (
                            <>
                                <ul>
                                    {itemsOrder.map((item) => (
                                        <li key={item.key}>{item.pizza} - x{item.qty}</li>
                                    ))}
                                </ul>
                                <Button variant="success" onClick={handleShow} >Finish Order</Button>
                            </>
                        ):(
                            <h4>Your order is empty, please select pizzas!</h4>
                        )
                    ):(
                        <h4>Your order is cofirmed: {orderComplete}. Please check your email inbox.</h4> 
                    )
                    }
                </div>            
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Finish order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure confirm your order?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>{saveOrder()}}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default PizzasPage