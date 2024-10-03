import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPaperPlane, FaComments } from "react-icons/fa";
import NavigationBar from "../Homepage/Navigationbar";

function MessageApp() {
  axios.defaults.withCredentials = true;
  const { organizationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const userToChatId = organizationId;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}mes/${userToChatId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchUserIdAndConnectSocket = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}userId`,
          {
            withCredentials: true,
          }
        );
        setUserId(response.data.userId);

        const newSocket = io(`${import.meta.env.VITE_APP_URL}`, {
          transports: ["websocket", "polling", "flashsocket"],
          auth: {
            userId: response.data.userId,
          },
        });

        newSocket.on("connect", () => {
          console.log("Connected to server!");
        });

        newSocket.on("message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserIdAndConnectSocket();
    fetchMessages();
  }, [organizationId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage && organizationId && userId && socket) {
      try {
        const data = {
          message: newMessage,
          createdAt: new Date(), // Add the createdAt timestamp when sending the message
        };
        await axios.post(
          `${import.meta.env.VITE_APP_URL}send/${organizationId}`,
          data
        );

        socket.emit("sendMessage", {
          ...data,
          senderId: userId,
          receiverUserId: organizationId,
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="bg-gray-100 min-h-screen pt-16">
        <main className="container mx-auto px-4 py-4 flex">
          <section className="bg-white rounded-xl shadow-lg overflow-hidden w-2/3 mr-8">
            <div className="px-6 py-4 bg-amber-500 text-white">
              <h2 className="text-2xl font-bold">Message App</h2>
            </div>
            <div className="px-6 py-4 flex flex-col h-[calc(100vh-250px)]">
              <div className="flex-grow overflow-y-auto mb-4 hide-scrollbar">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.senderId === organizationId
                        ? "justify-start"
                        : "justify-end"
                    } mb-2`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-xs ${
                        message.senderId === organizationId
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="border border-gray-300 rounded-full py-2 px-4 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </form>
            </div>
          </section>

          <div className="w-1/3 flex items-center justify-center">
            <div className="text-center">
              <FaComments className="text-amber-500 text-9xl ml-14 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Chat!
              </h3>
              <p className="text-gray-600">
                Connect and communicate with ease.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MessageApp;
