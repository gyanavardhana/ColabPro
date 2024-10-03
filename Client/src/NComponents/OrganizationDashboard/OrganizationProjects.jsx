import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLightbulb,FaGithub, FaEdit, FaTrash } from "react-icons/fa";

const OrganizationProjects = () => {
  axios.defaults.withCredentials = true;
  const [projects, setProjects] = useState([]);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    githubLink: "",
    techUsed: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}allprojects`
      );
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleEditClick = (project) => {
    setEditedProject(project);
    setIsEditPopupOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_URL}editproject/${editedProject._id}`,
        editedProject
      );
      setIsEditPopupOpen(false);
      setEditedProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_URL}deleteproject/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editedProject) {
      setEditedProject({
        ...editedProject,
        [name]: value,
      });
    } else {
      setNewProject({
        ...newProject,
        [name]: value,
      });
    }
  };

  const handleAddProject = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_URL}createproject`,
        newProject
      );
      setIsCreatePopupOpen(false);
      setNewProject({
        title: "",
        description: "",
        githubLink: "",
        techUsed: "",
      });
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-amber-700">Projects</h2>

      <button
        onClick={() => setIsCreatePopupOpen(true)}
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded flex items-center mb-6"
      >
        <FaLightbulb className="mr-2" /> Create Project
      </button>

      {/* Add Project Form */}
      {isCreatePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-amber-600">
              Add New Project
            </h3>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows="3"
            />
            <input
              type="text"
              placeholder="GitHub Link"
              name="githubLink"
              value={newProject.githubLink}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              placeholder="Technologies Used (comma-separated)"
              name="techUsed"
              value={newProject.techUsed}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddProject}
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

      {/* Edit Project Form */}
      {isEditPopupOpen && editedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-amber-700">
              Edit Project
            </h3>
            <input
              type="text"
              name="title"
              value={editedProject.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <textarea
              name="description"
              value={editedProject.description}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows="4"
            />
            <input
              type="text"
              name="githubLink"
              value={editedProject.githubLink}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="text"
              name="techUsed"
              value={editedProject.techUsed}
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

      {/* Project List */}
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-amber-50 p-6 rounded-xl shadow-md mb-4"
        >
          <h2 className="text-xl font-bold mb-2 text-amber-800">
            {project.title}
          </h2>
          <p className="mb-2 text-gray-700">{project.description}</p>
          <p className="mb-4 text-gray-700">
            <strong>Tech Used:</strong> {project.techUsed.join(", ")}
          </p>
          <div className="flex justify-between items-center">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="text-amber-600 hover:text-amber-800"
            >
              <FaGithub className="text-2xl" />
            </a>
            <div className="flex justify-end">
              <button
                onClick={() => handleEditClick(project)}
                className="mr-2 text-amber-600 border border-amber-600 hover:bg-amber-100 font-bold py-2 px-4 rounded flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-500 border border-red-500 hover:bg-red-100 font-bold py-2 px-4 rounded flex items-center"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationProjects;
