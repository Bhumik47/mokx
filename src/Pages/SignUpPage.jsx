import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../Components/Button";
import IconButton from "@mui/material/IconButton";
import CurvedBackIcon from "../Components/CurvedBackIcon";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

import User from "../models/user";
import { createUserWithEmailAndPassword } from "@firebase/auth";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  /* const Input = styled(TextField)`
    width: 327px;

    & .MuiInput-underline:before {
      border-bottom: 2px solid #cdd1d0;
    }

    & .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: 2px solid #cdd1d0;
    }

    & .MuiInput-underline:after {
      border-bottom: 2px solid #cdd1d0;
    }
  `;

  const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  });
 */
  const inputLabelStyles = {
    color: "#69235B",
    textAlign: "center",
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "14px",
    letterSpacing: "0.1px",
  };
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleSignup = (e) => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-page">
      <div style={{ alignSelf: "flex-start" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          style={{ marginLeft: 30 }}
          onClick={handleBackClick}
        >
          <CurvedBackIcon color="#000E08" />
        </IconButton>
        <img src="/Assets/MOkx logo 1.png" alt="logo" />
      </div>
      <div className="signup-typography">
        <h3>Sign up with Email</h3>
        <img src="/Assets/Line 42 (Stroke).png" alt="style" />
        <p>Enter your details and dive into a realm of ancient wisdom! 💫</p>
      </div>
      <form onSubmit={handleSignup}>
        <input
          label="Your name"
          variant="standard"
          type="text"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          label="Your email"
          variant="standard"
          type="email"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          label="Password"
          variant="standard"
          type="password"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          label="Confirm Password"
          variant="standard"
          type="password"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/*  <div style={{ marginTop: "4rem" }}>
          <Button title="Create an account" func={handleSignup} />
        </div> */}
        <button type="submit">signup</button>
      </form>
    </div>
  );
}

export default SignUpPage;
