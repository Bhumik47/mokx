import React from "react";
import Social from "../Components/Social";
import OR from "../Components/OR";
import Button from "../Components/Button";

function Home() {
  return (
    <div className="home">
      <div className="image-container">
        <img
          src="/Assets/cartoon-image-of-indian-girl-doing-namaste 1.png"
          alt=""
        />
      </div>
      <div className="arya">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="193"
          height="31"
          viewBox="0 0 193 31"
          fill="none"
        >
          <p>Arya, AI Acharya</p>
          <path
            d="M0.875 5.6875C0.875 2.5809 3.3934 0.0625 6.5 0.0625H186.5C189.607 0.0625 192.125 2.5809 192.125 5.6875V24.8125C192.125 27.9191 189.607 30.4375 186.5 30.4375H6.50001C3.3934 30.4375 0.875 27.9191 0.875 24.8125V5.6875Z"
            fill="#CBCBFF"
          />
        </svg>
        <p>Arya, AI Acharya</p>
      </div>
      <div className="typography">
        <p>
          Discover the timeless wisdom of
          <span> the Vedas.</span>
        </p>
        <p>
          Sign up and
          <span> journey through ancient knowledge with Arya 🌟</span>{" "}
        </p>
      </div>
      <div className="Authentication-options">
        <Social border="1px solid #A8B0AF" color="#FFFFFF" />
        <OR color="#FFFFFF" opacity={0.20000000298023224} />
        <Button title="Sign up with mail" />
        <p>
          Existing account?<a href=""> Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Home;
