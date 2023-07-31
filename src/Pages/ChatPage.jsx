import React, { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CurvedBackIcon from "../Components/CurvedBackIcon";
import CustomMessage from "../Components/CustomMessage";
import Online from "../Components/Online";

function ChatPage() {
  const [isLanguageButtonActive, setIsLanguageButtonActive] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: `🙏 Namaste! I’m Arya, your AI Vedic help. I'm here to provide insights from Vedas for daily life concerns. 
        Whether you seek guidance on mantras, general life advice, or specific Vedic interpretations, I’m here to assist you.`,
      sender: "Arya",
      profilePhoto: "/Assets/Rectangle 1092.png",
      direction: "incoming",
    },
  ]);

  // Simulate a response from Arya
  const simulateAryaReply = (userMessage) => {
    // You can implement your AI backend call here to get a real response from Arya
    // For this example, I'll simulate a simple reply
    return {
      message: `You said: ${userMessage}. This is Arya's reply.`,
      sender: "Arya",
      direction: "incoming",
      profilePhoto: "/Assets/Rectangle 1092.png",
    };
  };

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage]; // all old messages + new message

    // Update our messages state
    setMessages(newMessages);

    setTyping(true); // Arya is typing

    // Simulate a response from Arya
    const aryaReply = simulateAryaReply(message);

    // Delay for a better UI experience (remove this in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add Arya's reply to the messages
    setMessages((prevMessages) => [...prevMessages, aryaReply]);

    setTyping(false); // Arya has finished typing
  };

  const handleBackClick = () => {};

  const handleLanguageButtonClick = () => {
    setIsLanguageButtonActive((prevState) => !prevState);
  };

  return (
    <div className="chat-page">
      <div
        style={{
          position: "relative",
          height: 812,
          width: 375,
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
                  color: isLanguageButtonActive ? "#FBBC04" : "#FBDC94",
                  fontWeight: isLanguageButtonActive ? 800 : 275,
                }}
              >
                A/
              </p>
              <p
                style={{
                  color: isLanguageButtonActive ? "#FBDC94" : "#FBBC04",
                  fontWeight: isLanguageButtonActive ? 275 : 800,
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
              {messages.map((message, i) => {
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
