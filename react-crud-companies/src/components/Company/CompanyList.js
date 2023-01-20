import React, { useEffect, useState } from "react";
import CompanyItem from "./CompanyItem";
import * as CompanyServer from "./CompanyServer";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  const listCompanies = async () => {
    try {
      const res = await CompanyServer.listCompanies();
      const data = await res.json();
      setCompanies(data.company);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listCompanies();
  }, []);

  return (
    <div className="row">
      {companies.map((el) => (
        <CompanyItem key={el.id} company={el} listCompanies={listCompanies} />
      ))}
    </div>
  );
};

export default CompanyList;
