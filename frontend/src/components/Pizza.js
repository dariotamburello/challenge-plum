import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Pizza = (props) => {
  let ingredients = [];
  ingredients = props.ingredients.split(",")
  let routeImages = "../images/" + props.name + ".png"

  const selectPizza = () => {
    let pizza = props
    props.onSelectPizza(pizza)
  }

  return (

    <Card className="" style={{ width: '10rem' }}>
      <Card.Img variant="top" src={routeImages} />
      <Card.Body>
        <Card.Title>{props.name} - ${props.price}</Card.Title>
        <Card.Text>
          Ingredients:
          <ul>
            {ingredients.map((ingredient) => (
              
              <li>{ingredient}</li>
              
            ))}
          </ul>
        </Card.Text>
        <Button variant="primary" onClick={()=>{selectPizza()}}>Add to order</Button>
      </Card.Body>
    </Card>
  )
}

export default Pizza