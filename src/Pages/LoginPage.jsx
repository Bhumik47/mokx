import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../Components/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CurvedBackIcon from "../Components/CurvedBackIcon";
import Social from "../Components/Social";
import OR from "../Components/OR";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    gap: "1.3rem",
  }); */

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

  const handleChat = () => {
    navigate("/chat");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <AppBar
        position="static"
        className="no-box-shadow"
        style={{ backgroundColor: "#fff" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBackClick}
          >
            <CurvedBackIcon color="#000E08" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="login-typography">
        <h3>Log in to Mokx</h3>
        <img src="/Assets/Line 42 (Stroke).png" alt="style" />
        <p>
          Welcome back! Sign in using your social account or email to continue
          us
        </p>
      </div>
      <Social border="1px solid black" color="#000000" />
      <OR color="#69235B" opacity={0.5} />
      <form onSubmit={handleLogin}>
        <input
          label="Your email" // Label for the email field
          variant="standard" // Standard variant
          type="email" // Specify input type as email
          margin="normal" // Add some space below the input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: inputLabelStyles }}
        />
        <input
          label="Password" // Label for the password field
          variant="standard" // Standard variant
          type="password" // Specify input type as password
          margin="normal" // Add some space below the input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: inputLabelStyles }}
        />
        {/* <div style={{ marginTop: "8rem" }}>
          <Button title="Login" func={handleChat} />
        </div> */}
        <button>Login</button>
      </form>
      <p>Forgot Password?</p>
    </div>
  );
}

export default LoginPage;
