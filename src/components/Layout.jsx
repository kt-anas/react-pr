import React from "react";
import { Link, Outlet } from "react-router";
import Button from 'react-bootstrap/Button';

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/localStorage">
            <Button>Todo App</Button>
          </Link>
       
          <Link to="/pagination_btn?page=1">
            <Button>Pagination</Button>
          </Link>

          <Link to='userform'>
            <Button>UseForm</Button>
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
