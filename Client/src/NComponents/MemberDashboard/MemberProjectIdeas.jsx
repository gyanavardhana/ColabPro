import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLightbulb, FaEdit, FaTrash } from "react-icons/fa";

const MemberProjectIdeas = () => {
  axios.defaults.withCredentials = true;
  const [projectIdeas, setProjectIdeas] = useState([]);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedProjectIdea, setEditedProjectIdea] = useState({
    title: "",
    description: "",
    skillsRequired: [],
  });

  const [newProjectIdea, setNewProjectIdea] = useState({
    title: "",
    description: "",
    skillsRequired: [],
  });

  useEffect(() => {
    fetchProjectIdeas();
  }, []);

  const fetchProjectIdeas = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}mem/getprojectideas`
      );
      setProjectIdeas(response.data);
    } catch (error) {
      console.error("Error fetching project ideas:", error);
    }
  };

  const handleEditClick = (idea) => {
    setEditedProjectIdea(idea);
    setIsEditPopupOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_URL}mem/editprojectidea/${editedProjectIdea._id}`,
        editedProjectIdea
      );
      setIsEditPopupOpen(false);
      setEditedProjectIdea({
        title: "",
        description: "",
        skillsRequired: [],
      });
      fetchProjectIdeas();
    } catch (error) {
      console.error("Error updating project idea:", error);
    }
  };

  const handleDeleteProjectIdea = async (projectId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_URL}mem/deleteprojectidea/${projectId}`);
      fetchProjectIdeas();
    } catch (error) {
      console.error("Error deleting project idea:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "skillsRequired") {
      const skills = value.split(",").map((skill) => skill.trim());
      setEditedProjectIdea({
        ...editedProjectIdea,
        [name]: skills,
      });
    } else {
      setEditedProjectIdea({
        ...editedProjectIdea,
        [name]: value,
      });
    }
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "skillsRequired") {
      const skills = value.split(",").map((skill) => skill.trim());
      setNewProjectIdea({
        ...newProjectIdea,
        [name]: skills,
      });
    } else {
      setNewProjectIdea({
        ...newProjectIdea,
        [name]: value,
      });
    }
  };

  const handleAddProjectIdea = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_URL}mem/postprojectidea`,
        newProjectIdea
      );
      setNewProjectIdea({
        title: "",
        description: "",
        skillsRequired: [],
      });
      fetchProjectIdeas();
      setIsCreatePopupOpen(false);
    } catch (error) {
      console.error("Error posting project idea:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-amber-700">Project Ideas</h2>
        
        <button
          onClick={() => setIsCreatePopupOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded flex items-center mb-6"
        >
          <FaLightbulb className="mr-2" /> Create Project Idea
        </button>

        {projectIdeas.map((idea, index) => (
          <div key={index} className="bg-amber-50 p-6 rounded-xl shadow-md mb-4">
            <h3 className="text-xl font-bold mb-2 text-amber-800">{idea.title}</h3>
            <p className="mb-2 text-gray-700">{idea.description}</p>
            <p className="mb-4 text-gray-700">
              <strong>Skills Required:</strong> {idea.skillsRequired.join(", ")}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => handleEditClick(idea)}
                className="mr-2 text-amber-600 border border-amber-600 hover:bg-amber-100 font-bold py-2 px-4 rounded flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => handleDeleteProjectIdea(idea._id)}
                className="text-red-500 border border-red-500 hover:bg-red-100 font-bold py-2 px-4 rounded flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}

        {isCreatePopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-amber-600">Add New Project Idea</h3>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={newProjectIdea.title}
                onChange={handleNewInputChange}
                className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                placeholder="Description"
                name="description"
                value={newProjectIdea.description}
                onChange={handleNewInputChange}
                className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows="3"
              ></textarea>
              <input
                type="text"
                placeholder="Skills Required (comma-separated)"
                name="skillsRequired"
                value={newProjectIdea.skillsRequired.join(", ")}
                onChange={handleNewInputChange}
                className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddProjectIdea}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsCreatePopupOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-amber-700">Edit Project Idea</h3>
              <input
                type="text"
                name="title"
                value={editedProjectIdea.title}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                name="description"
                value={editedProjectIdea.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows="4"
              ></textarea>
              <input
                type="text"
                name="skillsRequired"
                value={Array.isArray(editedProjectIdea.skillsRequired) ? editedProjectIdea.skillsRequired.join(", ") : ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSaveEdit}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditPopupOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberProjectIdeas;