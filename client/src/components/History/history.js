import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import ToastService from '../../services/toast';

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:5000/api/history/list?page=${currentPage}`);
        const data = await response.json();
        setHistoryData(data.data.list);
        setTotalPages(Math.ceil(data.data.totalRecords / 6)); // Assuming 6 items per page
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentPage]);

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
      let data = await response.json();
      if (data.data.status_code === 0) {
        await ToastService.error(data.data.message);
      } else if (data.data.status_code === 1) {
        await ToastService.success("Product added to cart successfully");
      }

      console.log('Item added to cart:', productId);

    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">History Component</h2>

      {loading && <Spinner animation="border" role="status" />}

      {historyData.length > 0 && !loading && (
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {historyData.map((item) => (
            <Col key={item.id}>
              <Card style={{ width: '18rem', height: '400px' }} className="mb-4">
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={`Product ${item.id}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>Product {item.id}</Card.Title>
                  <Card.Text>
                    Price: ${item.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => addToCart(item.id)}>
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && historyData.length === 0 && (
        <p>No history data available.</p>
      )}

      {/* Bootstrap Pagination */}
      <div className="mt-3">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  );
}

export default History;
