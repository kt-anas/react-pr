import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import PostCard from "./PostCard";
import PageNav from "./PageNav";
import usePagination from "../../hooks/pagination/usePagination";
import Button  from "react-bootstrap/Button";
import { Link } from "react-router";

const PagNationBtn = () => {
  const { data, error, page, totalPages, goToPage, isLoading } =
    usePagination();
  if (isLoading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">Error loading data</Alert>;
  return (
    <> 
    {/* <Link to={'/pagination_btn/:pageNo'}>
     <Button>Pagination Buttons</Button>
    </Link> */}
    <Link to={'/PagNationScroll'}>
    
     <Button>Pagiantion Scroll</Button>
    </Link>
    <Link to={'/infinite'}>
     
     <Button>Infinite Scroll</Button>
    </Link>
      <Container className="mt-4">
        <Row>
          {data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Row>
        <PageNav page={page} totalPages={totalPages} goToPage={goToPage} />
      </Container>
    </>
  );
};

export default PagNationBtn;
