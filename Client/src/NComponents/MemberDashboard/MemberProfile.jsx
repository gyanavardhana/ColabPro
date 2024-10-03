import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { FaUser, FaEnvelope, FaTools, FaPhone, FaHeart, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

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
      <ul className="list-disc list-inside mt-2">
        {Array.isArray(value) ? (
          value.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))
        ) : (
          <li className="text-gray-700">{value}</li>
        )}
      </ul>
    </div>
  );
};

const MemberProfile = () => {
  axios.defaults.withCredentials = true;
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    skills: [],
    githubUsername: "",
    contact: "",
    interests: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    fetchMemberProfile();
  }, []);

  const fetchMemberProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}mem/memberprofile`);
      const userData = response.data;

      if (Array.isArray(userData.skills)) {
        setFormData({ ...formData, ...userData });
      } else {
        setFormData({ ...formData, ...userData, skills: [userData.skills] });
      }
    } catch (error) {
      console.error("Error fetching member profile:", error);
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
      await axios.patch(`${import.meta.env.VITE_APP_URL}mem/editprofile`, formData);
      console.log("Member profile updated successfully.");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating member profile:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-amber-700">Member Profile</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-amber-500 text-white">
            <h3 className="text-2xl font-bold">Personal Information</h3>
          </div>
          <div className="p-6">
            {editMode ? (
              <div>
                <EditableField label="Name" value={formData.name} name="name" onChange={handleInputChange} icon={<FaUser className="text-amber-500" />} />
                <EditableField label="Email" value={formData.email} name="email" onChange={handleInputChange} icon={<FaEnvelope className="text-amber-500" />} />
                <EditableField label="Skills" value={formData.skills} name="skills" onChange={handleInputChange} icon={<FaTools className="text-amber-500" />} />
                <EditableField label="Contact" value={formData.contact} name="contact" onChange={handleInputChange} icon={<FaPhone className="text-amber-500" />} />
                <EditableField label="Interests" value={formData.interests} name="interests" onChange={handleInputChange} icon={<FaHeart className="text-amber-500" />} />
                <EditableField label="Twitter" value={formData.twitter} name="twitter" onChange={handleInputChange} icon={<FaTwitter className="text-amber-500" />} />
                <EditableField label="GitHub" value={formData.github} name="github" onChange={handleInputChange} icon={<FaGithub className="text-amber-500" />} />
                <EditableField label="LinkedIn" value={formData.linkedin} name="linkedin" onChange={handleInputChange} icon={<FaLinkedin className="text-amber-500" />} />

                <div className="flex justify-end mt-6">
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
                <DisplayField label="Name" value={formData.name} icon={<FaUser className="text-amber-500" />} />
                <DisplayField label="Email" value={formData.email} icon={<FaEnvelope className="text-amber-500" />} />
                <DisplayField label="Skills" value={formData.skills} icon={<FaTools className="text-amber-500" />} />
                <DisplayField label="Contact" value={formData.contact} icon={<FaPhone className="text-amber-500" />} />
                <DisplayField label="Interests" value={formData.interests} icon={<FaHeart className="text-amber-500" />} />
                <DisplayField label="Twitter" value={formData.twitter} icon={<FaTwitter className="text-amber-500" />} />
                <DisplayField label="GitHub" value={formData.github} icon={<FaGithub className="text-amber-500" />} />
                <DisplayField label="LinkedIn" value={formData.linkedin} icon={<FaLinkedin className="text-amber-500" />} />

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

export default MemberProfile;