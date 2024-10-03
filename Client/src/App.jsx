import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './NComponents/Homepage/HomePage';
import Login from './NComponents/Login/Login';
import Signup from './NComponents/Signup/Signup';
import ResourcesPage from './NComponents/ResourcePage/ResourcePage';
import ContactUs from './NComponents/ContactUs/ContactUs';
import Community from './NComponents/Community/Community';
import MessageApp from './NComponents/ChatApp/MessageApp';
import ProjectsList from './NComponents/Projects/ProjectsList';
import ChatPage from './NComponents/ChatApp/ChatPage';
import Dashboard from './NComponents/Dashboard';
import ProjectIdeasList from './NComponents/ProjectIdeas/ProjectIdeasList';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projectideas" element={<ProjectIdeasList />} />
        <Route path="/chat" element={<ChatPage />}/>
        <Route path="/message-app/:organizationId" element={<MessageApp />} />
      </Routes>
    </div>
  );
}

export default App;
