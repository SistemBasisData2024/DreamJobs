import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContexts'; 
import '../styles/Company.css';

const Company = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        contact: ''
    });
    const [companyDetail, setCompanyDetail] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchCompanyDetail = async () => {
        if (!user || !user.id) {
            console.error('User ID tidak ditemukan atau null');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:4000/company/${user.id}`);
            if (response.data) {
                setCompanyDetail(response.data);
                setFormData({
                    name: response.data.name,
                    description: response.data.description,
                    address: response.data.address,
                    contact: response.data.contact
                });
            }
        } catch (error) {
            console.error('Error fetching company detail:', error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/company/${user.id}`, formData);
            setCompanyDetail(response.data);
            alert('Company detail added successfully');
        } catch (error) {
            console.error('Error adding company detail:', error);
            alert('Error adding company detail');
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/company/${companyDetail.id}`, formData);
            setCompanyDetail(response.data);
            setIsEditMode(false);
            alert('Company detail updated successfully');
        } catch (error) {
            console.error('Error updating company detail:', error);
            alert('Error updating company detail');
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchCompanyDetail();
        }
    }, [user]);
 
    return (
        <div className="company-container">
          <h1 className="title">Company Details</h1>
          {companyDetail ? (
            <div className="company-details">
              {!isEditMode ? (
                <div className="company-details-view">
                  <p><strong>Name:</strong> {companyDetail.name}</p>
                  <p><strong>Description:</strong> {companyDetail.description}</p>
                  <p><strong>Address:</strong> {companyDetail.address}</p>
                  <p><strong>Contact:</strong> {companyDetail.contact}</p>
                  <button className="edit-button" onClick={() => setIsEditMode(true)}>Edit Details</button>
                </div>
              ) : (
                <form className="company-form" onSubmit={handleUpdateSubmit}>
                  <textarea
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                  />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact"
                    required
                  />
                  <button type="submit">Update Details</button>
                  <button type="button" onClick={() => setIsEditMode(false)}>Cancel</button>
                </form>
              )}
            </div>
          ) : (
            <form className="company-form" onSubmit={handleAddSubmit}>
              <h2>Add Company Details</h2>
              <textarea
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                required
              />
              <button type="submit">Add Details</button>
            </form>
          )}
        </div>
      );
};

export default Company;
