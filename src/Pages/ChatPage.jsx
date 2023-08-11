import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Auth";
import "../Query-suggestion.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CurvedBackIcon from "../Components/CurvedBackIcon";
import CustomMessage from "../Components/CustomMessage";
import Online from "../Components/Online";
import { useEffect } from "react";

function ChatPage() {
  const [isLanguageButtonActive, setIsLanguageButtonActive] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true); // State to track suggestion visibility
  const [userSentFirstMessage, setUserSentFirstMessage] = useState(false); // State to track first message
  const [messages, setMessages] = useState([
    {
      message: `🙏 Namaste! I’m Arya, your AI Vedic help. I'm here to provide insights from Vedas for daily life concerns. 
        
      Whether you seek guidance on mantras, general life advice, or specific Vedic interpretations, I’m here to assist you.`,
      sender: "Arya",
      profilePhoto: "/Assets/Rectangle 1092.png",
      direction: "incoming",
      timestamp: new Date(),
    },
    {
      message: `Let your curiosity guide you, wishing you blessings and enlightenment 🕉️`,
      sender: "Arya",
      profilePhoto: "/Assets/Rectangle 1092.png",
      direction: "incoming",
      timestamp: new Date(),
    },
  ]);

  /* const { user } = useUser();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);
 */
  // Simulate a response from Arya
  const simulateAryaReply = async (userMessage) => {
    console.log("user message", userMessage);
    const formData = new FormData();
    formData.append("text", userMessage);
    console.log(formData);
    const response = await fetch("http://20.235.118.112:5000/generate", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json;
      });
    console.log("response", response);
    return {
      message: response.response, // Use the actual response from Arya
      sender: "Arya",
      profilePhoto: "/Assets/Rectangle 1092.png",
      direction: "incoming",
      timestamp: new Date(),
    };
  };

  const handleSend = async (message) => {
    if (!userSentFirstMessage) {
      setShowSuggestions(false); // Hide the suggestions after the user sends the first message
      setUserSentFirstMessage(true);
    }
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
      timestamp: new Date(),
    };
    const newMessages = [...messages, newMessage]; // all old messages + new message

    // Update our messages state
    setMessages(newMessages);

    setTyping(true); // Arya is typing

    // Simulate a response from Arya
    const aryaReply = await simulateAryaReply(message);
    console.log("arya reply is", aryaReply);

    // Delay for a better UI experience (remove this in production)
    // Add Arya's reply to the messages
    setMessages((prevMessages) => [...prevMessages, aryaReply]);

    setTyping(false); // Arya has finished typing
  };
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLanguageButtonClick = () => {
    setIsLanguageButtonActive((prevState) => !prevState);
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSend(suggestionText); // Send the suggestion as a message
  };

  return (
    <div className="chat-page">
      <div
        style={{
          position: "relative",
          height: "88vh",
          width: "100%",
          maxWidthwidth: 400,
          background: "#F8F8FF",
        }}
      >
        <AppBar
          position="static"
          className="no-box-shadow"
          style={{
            position: "relative",
            background: "#fff",
            flexShrink: 0,
            boxShadow: "0px 5px 20px 0px rgba(17, 18, 34, 0.02)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={handleBackClick}
            >
              <CurvedBackIcon color="#69235B" />
            </IconButton>
            <div className="profile-wrapper">
              <img src="/Assets/Rectangle 1092.png" alt="profile" />
              <Online />
              <div className="chat-name">
                <p>Arya</p>
                <p>Vedic AI Bot</p>
              </div>
            </div>
            <button
              className="language-button"
              onClick={handleLanguageButtonClick}
            >
              <p
                style={{
                  color: isLanguageButtonActive ? "#FBDC94" : "#FBBC04",
                  fontWeight: isLanguageButtonActive ? 275 : 800,
                }}
              >
                A/
              </p>
              <p
                style={{
                  color: isLanguageButtonActive ? "#FBBC04" : "#FBDC94",
                  fontWeight: isLanguageButtonActive ? 800 : 275,
                }}
              >
                क
              </p>
            </button>
          </Toolbar>
        </AppBar>
        <MainContainer style={{ background: "#F8F8FF", border: "none" }}>
          <ChatContainer
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#F8F8FF",
            }}
          >
            <MessageList
              style={{ background: "#F8F8FF", margin: 10 }}
              typingIndicator={
                typing ? <TypingIndicator content="Arya is typing" /> : null
              }
            >
              {messages.slice(0, 1).map((message, i) => {
                return <CustomMessage key={i} model={message} />;
              })}
              {showSuggestions && (
                <div className="query-suggetion">
                  <div className="heading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="21"
                      viewBox="0 0 19 21"
                      fill="none"
                    >
                      <path
                        d="M4.22222 21L8.44444 13.125L0 12.075L12.6667 0H14.7778L10.5556 7.875L19 8.925L6.33333 21H4.22222Z"
                        fill="#69235B"
                      />
                    </svg>
                    <p>You can ask queries like:</p>
                  </div>
                  <div
                    className="suggetion"
                    onClick={() =>
                      handleSuggestionClick(
                        "What is the mantra in Rigveda 10.2.3?"
                      )
                    }
                  >
                    What is the mantra in Rigveda 10.2.3?
                  </div>
                  <div
                    className="suggetion"
                    onClick={() =>
                      handleSuggestionClick(
                        " What are the prescribed Vedic remedies for snake bites?"
                      )
                    }
                  >
                    What are the prescribed Vedic remedies for snake bites?
                  </div>
                  <div
                    className="suggetion"
                    onClick={() =>
                      handleSuggestionClick(
                        "  Can you tell me the significance of the Gayatri Mantra?"
                      )
                    }
                  >
                    Can you tell me the significance of the Gayatri Mantra?
                  </div>

                  <div className="Limitation">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="14"
                      viewBox="0 0 17 14"
                      fill="none"
                    >
                      <path
                        d="M8.5 1L1 13H16L8.5 1Z"
                        stroke="#69235B"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.5 10.4737V10.7895M8.5 5.42104L8.50316 8.57894"
                        stroke="#69235B"
                        stroke-linecap="round"
                      />
                    </svg>
                    <p>Limitation: May struggle with complex queries.</p>
                  </div>
                </div>
              )}
              {messages.slice(1).map((message, i) => {
                return <CustomMessage key={i} model={message} />;
              })}
            </MessageList>

            <MessageInput
              style={{ marginBottom: 22 }}
              className="message-input"
              placeholder="Write your message"
              onSend={handleSend}
              sendButtonProps={{ className: "custom-send-button" }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ChatPage;
