import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { FaBuilding, FaEnvelope, FaIndustry, FaPhone, FaInfoCircle } from "react-icons/fa";

const EditableField = ({ label, value, name, onChange, icon }) => {
  return (
    <div className="mb-4">
      <label className=" mb-1 text-amber-700 flex items-center">
        {icon}
        <span className="ml-2">{label}:</span>
      </label>
      <TextField
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d97706',
            },
            '&:hover fieldset': {
              borderColor: '#b45309',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#92400e',
            },
          },
        }}
      />
    </div>
  );
};

const DisplayField = ({ label, value, icon }) => {
  return (
    <div className="mb-4 bg-amber-50 p-4 rounded-lg shadow">
      <p className="font-semibold text-amber-800 flex items-center">
        {icon}
        <span className="ml-2">{label}:</span>
      </p>
      {Array.isArray(value) ? (
        <ul className="list-disc list-inside mt-2">
          {value.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 mt-2">{value}</p>
      )}
    </div>
  );
};

const OrganizationProfile = () => {
  axios.defaults.withCredentials = true;
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Example Organization",
    email: "example@example.com",
    industry: "Technology",
    contact: "123-456-7890",
    description: "This is a description of the organization.",
    githubUsername: "exampleorg",
  });

  useEffect(() => {
    fetchOrganizationProfile();
  }, []);

  const fetchOrganizationProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}org/profile`);
      setFormData(response.data.organizationProfile);
    } catch (error) {
      console.error("Error fetching organization profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_APP_URL}org/editprofile`, formData);
      console.log("Organization profile updated successfully.");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating organization profile:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-amber-700">Organization Profile</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-amber-500 text-white">
            <h3 className="text-2xl font-bold">Organization Information</h3>
          </div>
          <div className="p-6">
            {editMode ? (
              <div>
                <EditableField label="Name" value={formData.name} name="name" onChange={handleInputChange} icon={<FaBuilding className="text-amber-500" />} />
                <EditableField label="Email" value={formData.email} name="email" onChange={handleInputChange} icon={<FaEnvelope className="text-amber-500" />} />
                <EditableField label="Industry" value={formData.industry} name="industry" onChange={handleInputChange} icon={<FaIndustry className="text-amber-500" />} />
                <EditableField label="Contact" value={formData.contact} name="contact" onChange={handleInputChange} icon={<FaPhone className="text-amber-500" />} />
                <EditableField label="Description" value={formData.description} name="description" onChange={handleInputChange} icon={<FaInfoCircle className="text-amber-500" />} />

                <div className="flex space-x-3 justify-end mt-6">
                  <Button
                    onClick={handleSaveClick}
                    variant="contained"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditMode(false)}
                    variant="contained"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <DisplayField label="Name" value={formData.name} icon={<FaBuilding className="text-amber-500" />} />
                <DisplayField label="Email" value={formData.email} icon={<FaEnvelope className="text-amber-500" />} />
                <DisplayField label="Industry" value={formData.industry} icon={<FaIndustry className="text-amber-500" />} />
                <DisplayField label="Contact" value={formData.contact} icon={<FaPhone className="text-amber-500" />} />
                <DisplayField label="Description" value={formData.description} icon={<FaInfoCircle className="text-amber-500" />} />

                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleEditClick}
                    variant="contained"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
