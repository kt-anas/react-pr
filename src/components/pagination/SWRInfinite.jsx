import React from "react";
import Spinner from "react-bootstrap/Spinner";
import useSWRInfiniteScroll from "../../hooks/pagination/useSWRInfiniteScroll";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const InfiniteScrollComponent = () => {
  const { items: data, error, isValidating, lastItemRef, hasMore } =
    useSWRInfiniteScroll();

  if (error) return <div className="alert alert-danger">Error loading data</div>;

  return (
    <div className="container mt-4">
      <Row className="gy-4">
        {data.map((post, index) => (
          <Col
            key={post.id}
            md={3}
            ref={index === data.length - 1 ? lastItemRef : null}
          >
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title
                  className="text-truncate fw-bold"
                  title={post.title}
                >
                  {post.title}
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  style={{ fontSize: "0.8rem" }}
                >
                  ID: {post.id}
                </Card.Subtitle>
                <Card.Text
                  style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    fontSize: "0.9rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  {post.body}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {isValidating && (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      )}

      {!hasMore && data.length > 0 && (
        <div className="text-center mt-4">
          <p>No more posts to load</p>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollComponent;
