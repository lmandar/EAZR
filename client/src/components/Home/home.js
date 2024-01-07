import React, { useState } from 'react';
import { Button, Card, Container, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import ToastService from '../../services/toast';

function Home() {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImage = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/home/fetch-image');
      const data = await response.json();
      setImageData(data.data);
      if (data.data.status_code == 0) {
        ToastService.error(data.data.message)
      }

    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          qty: 1, // You can adjust the quantity as needed
        }),
      });
      let data = await response.json()
      console.log(data)
      if (data.data.status_code === 0) {
        ToastService.error(data.data.message)
      }

      if (data.data.status_code === 1) {
        ToastService.success("Product added to cart successfully")
      }

      // If you want to update the local state after a successful API call,
      // you can refetch the cart details or update the state accordingly.

    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error(`Failed to add item to cart: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000, // Auto close the toast after 5000 milliseconds (5 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Home Component</h2>

      {loading && <Spinner animation="border" role="status" />}

      {imageData && !loading && (
        <>
          <Card style={{ width: '18rem' }} className="mb-4">
            <Card.Img variant="top" src={imageData.img} alt="Fetched Image" />
            <Card.Body>
              <Card.Title>Product Name</Card.Title>
              <Card.Text>
                Price: ${imageData.price}
              </Card.Text>
              <Button variant="primary" onClick={() => addToCart(imageData.id)}>Add to Cart</Button>
            </Card.Body>
          </Card>
          <ToastContainer />
        </>
      )}

      {!loading && (
        <Button variant="primary" onClick={fetchImage}>Fetch Image</Button>
      )}
    </Container>
  );
}

export default Home;
