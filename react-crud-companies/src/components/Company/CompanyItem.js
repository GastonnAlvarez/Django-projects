import React from "react";
import { useNavigate } from "react-router-dom"; 
import * as CompanyServer from "./CompanyServer";

const CompanyItem = ({ company, listCompanies }) => {
  let navigate = useNavigate();
  const handleDelete = async (companyId) => {
    await CompanyServer.deleteCompany(companyId);
    listCompanies();
  };

  return (
    <div className="cold-md-4 mb-4 col-3">
      <div className="card card-body">
        <h3 className="card-title">
          {company.name}
          <button className="btn btn-sm btn-info ms-2" onClick={()=> navigate(`/updateCompany/${company.id}`)}>Update</button>
        </h3>
        <p className="card-text">
          Founded:<strong>{company.foundation}</strong>
        </p>
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Go to the website
        </a>
        <button
          className="btn btn-danger my-2"
          onClick={() => company.id && handleDelete(company.id)}
        >
          Delete Company
        </button>
      </div>
    </div>
  );
};

export default CompanyItem;
