import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as CompanyServer from "./CompanyServer";

const CompanyForm = () => {
  const initialState = { id: 0, name: "", foundation: 1950, website: "" };
  const [companies, setCompanies] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  // console.log(params);

  const handleInputChange = (e) => {
    setCompanies({
      ...companies,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!params.id) {
        res = await CompanyServer.registerCompany(companies);
        const data = await res.json();
        if (data.Message === "Success") {
          setCompanies(initialState);
        }
      } else {
        await CompanyServer.updateCompany(params.id, companies);
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const getCompany = async (companyId) => {
    try {
      let res = await CompanyServer.getCompany(companyId);
      let data = await res.json();
      const { name, website, foundation } = data.company;
      setCompanies({
        foundation,
        name,
        website
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getCompany(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={companies.name}
            onChange={handleInputChange}
            className="form-control"
            minLength="2"
            maxLength="50"
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foundation</label>
          <input
            type="number"
            name="foundation"
            value={companies.foundation}
            onChange={handleInputChange}
            className="form-control"
            min="1900"
            max="2020"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Website</label>
          <input
            type="url"
            name="website"
            value={companies.website}
            onChange={handleInputChange}
            className="form-control"
            maxLength="100"
            required
          />
        </div>
        <div className="d-grid gap-2">
          {params.id ? (
            <button type="submit" className="btn btn-block btn-primary">
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
