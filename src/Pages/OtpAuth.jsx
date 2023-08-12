import React, { useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { signInWithPhoneNumber, RecaptchaVerifier } from "@firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import OtpInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";
import "../OtpAuth.css";
import { auth } from "../firebase.config";
import { CgSpinner } from "react-icons/cg";

function OtpAuth() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(0);
  const [rotation, setRotation] = useState(0);

  function startRotation() {
    const rotationInterval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 10) % 360); // Adjust the increment as needed
    }, 2000); // Adjust the interval as needed

    return rotationInterval;
  }

  function stopRotation(intervalId) {
    clearInterval(intervalId);
    setRotation(0);
  }

  function startTimer(duration) {
    setTimer(duration);
    const startTime = Date.now();

    const updateTimer = () => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = duration - elapsedTime;

      if (remainingTime > 0) {
        setTimer(remainingTime);
        setTimeout(updateTimer, 1000);
      } else {
        setTimer(0);
      }
    };

    updateTimer();
  }

  function stopTimer(intervalId) {
    clearInterval(intervalId);
    setTimer(0);
  }

  const navigate = useNavigate();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const formatPh = "+" + ph;

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Sent!");

        // Start the timer when OTP is sent
        const intervalId = startTimer(180); // 3 minutes in seconds
        // Enable resend button after the timer ends
        startTimer(180); // 3 minutes in milliseconds
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);

        navigate("/chat");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

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
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      <div className="contentWrapper">
        {showOTP ? (
          <>
            {" "}
            <div className="container">
              <div className="otp-typography">
                <p>OTP Verification</p>
              </div>
              <div>
                <div className="Authentication-otp">
                  <label htmlFor="otp">
                    Enter the code from the sms we sent to{" "}
                    <span>{`+${ph}`}</span>
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container "
                  ></OtpInput>
                  <div className="timer">
                    <p>
                      {timer > 0
                        ? `0${Math.floor(timer / 60)}:${
                            timer % 60 < 10 ? "0" : ""
                          }${timer % 60}`
                        : "00:00"}
                    </p>
                  </div>
                </div>

                <div className="button">
                  <p>
                    I didn't receive any code.{" "}
                    <span
                      onClick={() => {
                        if (timer <= 0) {
                          onSignup();
                        }
                      }}
                      className={timer > 0 ? "disabled-link" : "enable-link"}
                    >
                      RESEND
                    </span>
                  </p>
                  <button
                    type="submit"
                    onClick={async () => {
                      setLoading(true);
                      const rotationInterval = startRotation();
                      await onOTPVerify();
                      setLoading(false);
                      stopRotation(rotationInterval);
                    }}
                    disabled={loading}
                  >
                    {loading && (
                      <CgSpinner
                        size={20}
                        style={{
                          marginRight: "8px", // Adjust as needed
                          animation: "spin 1s linear infinite", // Apply spinning animation
                        }}
                      />
                    )}
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="otp-typography">
              <p style={{ textAlign: "start" }}>Start your Vedic quest</p>
            </div>
            <div className="Authentication-options">
              <label htmlFor="ph">Enter mobile no.*</label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
            </div>

            <div className="button">
              <button
                type="submit"
                onClick={async () => {
                  setLoading(true);
                  const rotationInterval = startRotation();
                  await onSignup();
                  setLoading(false);
                  stopRotation(rotationInterval);
                }}
                disabled={loading}
              >
                {loading && (
                  <CgSpinner
                    size={20}
                    style={{
                      marginRight: "8px", // Adjust as needed
                      animation: "spin 3s linear infinite", // Apply spinning animation
                    }}
                  />
                )}
                <span>Send OTP</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OtpAuth;
