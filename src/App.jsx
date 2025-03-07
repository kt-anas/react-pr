import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Todo from "./components/localStorage/Todo";
import PagNation from "./components/pagination/PagNationBtn";
import Layout from "./components/Layout";
import TodoDB from "./components/dataBase/Todo_db";
import PagNationScroll from "./components/pagination/PagNationScroll";
import SWRInfinite from "./components/pagination/SWRInfinite";
import UserForm from "./components/userForm/UserForm";
import InformedForm from "./components/Informed/Informed";
import Filter from "./components/FilterUrl/Filter";
import "./components/Informed/i18n";
import Map from "./components/map/Map";
import Installment from "./components/Installment/Installment";
import DynamicForm from "./components/dynamicFields/DynamicForm";
import InstallmentPage from "./components/newInstallment/InstallmentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/" />} />
        </Route>
        <Route path="/localStorage" element={<Todo />} />
        <Route path="/mongodb" element={<TodoDB />} />

        <Route path="/pagination_btn" element={<PagNation />} />
        <Route path="/PagNationScroll" element={<PagNationScroll />} />
        <Route path="/Infinite" element={<SWRInfinite />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/informed" element={<InformedForm />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/map" element={<Map />} />
        <Route path="/Installment" element={<Installment />} />
        <Route path="/dynamicform" element={<DynamicForm />} />
        <Route path="/newInstallment" element={<InstallmentPage />} />

        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
