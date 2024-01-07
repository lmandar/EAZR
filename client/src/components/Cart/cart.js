import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import ToastService from '../../services/toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cart details
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cart/list');
        const data = await response.json();
        if(data.data.status_code === 0 && data.data.message === "No items added"){
          setLoading(false);
          return (
            <Container className="mt-4">
              <h2>Cart</h2>
              <p>Your cart is empty</p>
            </Container>
          );
        }
        // Assuming the response structure is { data: [...] }
        setCartItems(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Calculate total price
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const removeFromCart = async (productId) => {
    try{
      const response = await fetch('http://localhost:5000/api/cart/remove-from-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId
        }),
      });
      let data = await response.json()
      console.log("data", data)
      if(data.data.status_code === 0){
        ToastService.error(data.data.message)
      }else if (data.data.status_code === 1){
        ToastService.success("Product removed from cart successfully")
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
      }
  
      console.log('Item added to cart:', productId);
    }catch(err){
      console.log(err)
      ToastService.error(err)
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-4">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card style={{ width: '18rem', height: '400px' }}>
                  <Card.Img variant="top" src={item.img} alt={`Product ${item.id}`} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{`Product ${item.id}`}</Card.Title>
                    <Card.Text>{`Price: $${item.price}`}</Card.Text>
                    <Card.Text>{`Quantity: ${item.qty}`}</Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                      Remove from Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mt-4">
            <h4>Order Summary</h4>
            <hr />
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex justify-content-between">
                  <span>{`Product ${item.id}`}</span>
                  <span>{`$${item.price} x ${item.qty}`}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
          <Button variant="primary" className="mt-3">
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
