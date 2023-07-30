import React from "react";
import TextField from "@mui/material/TextField";
import Button from "../Components/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CurvedBackIcon from "../Components/CurvedBackIcon";
import styled from "@emotion/styled";

function SignUpPage() {
  const Input = styled(TextField)`
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
  });

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

  const handleBackClick = () => {};

  return (
    <div className="signup-page">
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
            <CurvedBackIcon style={{ color: "#000E08" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <img src="/Assets/MOkx logo 1.png" alt="logo" />
      <div className="signup-typography">
        <h3>Sign up with Email</h3>
        <img src="/Assets/Line 42 (Stroke).png" alt="style" />
        <p>Enter your details and dive into a realm of ancient wisdom! 💫</p>
      </div>
      <Form>
        <Input
          label="Your name"
          variant="standard"
          type="text"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
        />
        <Input
          label="Your email"
          variant="standard"
          type="email"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
        />
        <Input
          label="Password"
          variant="standard"
          type="password"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
        />
        <Input
          label="Confirm Password"
          variant="standard"
          type="password"
          margin="normal"
          InputLabelProps={{ style: inputLabelStyles }}
        />
        <div style={{ marginTop: "4rem" }}>
          <Button title="Create an account" />
        </div>
      </Form>
    </div>
  );
}

export default SignUpPage;
