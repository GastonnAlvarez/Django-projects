import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import CompanyList from "./components/Company/CompanyList";
import Navbar from "./components/Navbar/Navbar";
import CompanyForm from "./components/Company/CompanyForm";

ReactDOM.render(
  <Router>
    <Navbar />
    <div className="container my-4">
      <Routes>
        <Route path="/" element={<CompanyList />}></Route>
        <Route path="companyForm/" element={<CompanyForm/>}></Route>
        <Route path="/updateCompany/:id" element={<CompanyForm/>}/>
      </Routes>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
