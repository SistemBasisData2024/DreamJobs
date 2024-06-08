import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CompanyDetail = () => {
    const { company_id } = useParams();
   const [company, setCompany] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/company/${company_id}`);
        setCompany(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'Error fetching company details');
      } finally {
        setLoading(false);
      }
    };
      fetchCompanyDetail();
   }, [company_id]);

   if (loading) return <div>Loading...</div>;
   if (error) return <div>{error}</div>;

   return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>{company.name}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <p><strong>Address:</strong> {company.address}</p>
        <p><strong>Contact:</strong> {company.contact}</p>
      </div>
      <p style={{ marginBottom: '10px' }}>{company.description}</p>
    </div>
  );
};

export default CompanyDetail;
