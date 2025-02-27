import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const PostCard = ({ post,id }) => (
  <Col md={6} lg={4} className="mb-4" >
    <Card style={{ height: '200px', overflow: 'hidden' }}>
      <Card.Body> 
        {id}
        <Card.Title
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {post.title}
        </Card.Title>
        <Card.Text
          style={{
            height: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {post.body}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default PostCard;
