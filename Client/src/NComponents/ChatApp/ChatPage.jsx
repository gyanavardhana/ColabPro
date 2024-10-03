import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";
import "../Homepage/sliding.css";
import NavigationBar from "../Homepage/Navigationbar";
import { FaUser, FaBuilding } from "react-icons/fa";

function ChatPage() {
  axios.defaults.withCredentials = true;
  const [organizationSenders, setOrganizationSenders] = useState([]);
  const [memberSenders, setMemberSenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchSenderIds = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}senderIds`
        );
        setOrganizationSenders(response.data);
        fetchSenderInfo(response.data);
      } catch (error) {
        navigate("/login");
        console.error("Error fetching sender IDs:", error);
      }
    };

    fetchSenderIds();
  }, []);

  const fetchSenderInfo = async (senderIds) => {
    try {
      const organizationInfoPromises = senderIds.map(async (senderId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}org/getorganizationinfo/${senderId}`
          );
          return { type: "organization", data: response.data };
        } catch (error) {
          return null;
        }
      });

      const memberInfoPromises = senderIds.map(async (senderId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}mem/getmemberinfo/${senderId}`
          );
          return { type: "member", data: response.data };
        } catch (error) {
          return null;
        }
      });

      const organizationResults = await Promise.all(organizationInfoPromises);
      const memberResults = await Promise.all(memberInfoPromises);

      const filteredOrganizationSenders = organizationResults.filter(
        (result) => result !== null
      );
      const filteredMemberSenders = memberResults.filter(
        (result) => result !== null
      );

      setOrganizationSenders(filteredOrganizationSenders);
      setMemberSenders(filteredMemberSenders);
    } catch (error) {
      console.error("Error fetching sender info:", error);
    }
  };

  const handleSelectSender = (senderId) => {
    navigate(`/message-app/${senderId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Chat Page</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <SenderList
              title="Organization Senders"
              senders={organizationSenders}
              icon={<FaBuilding className="text-amber-500" />}
              onSelectSender={handleSelectSender}
            />
            <SenderList
              title="Member Senders"
              senders={memberSenders}
              icon={<FaUser className="text-amber-500" />}
              onSelectSender={handleSelectSender}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SenderList({ title, senders, icon, onSelectSender }) {
  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      <List className="overflow-y-auto max-h-96 bg-gray-50 rounded-lg">
        {senders.map((sender, index) => {
          // Skip rendering if the sender ID is undefined
          if (!sender?.data?._id) return null;

          return (
            <ListItem
              key={`${title}-${index}`}
              onClick={() => onSelectSender(sender.data._id)}
              className="cursor-pointer border-b border-gray-200 hover:bg-amber-50 transition-colors duration-200"
            >
              <div className="flex items-center w-full">
                <div className="bg-amber-100 rounded-full p-2 mr-4">{icon}</div>
                <div>
                  <Typography
                    variant="body1"
                    className="text-gray-800 font-semibold"
                  >
                    {sender.data.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {sender.data.email}
                  </Typography>
                </div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ChatPage;
