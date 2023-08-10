import React, { useState, useEffect } from "react";
/* import Home from "./Home"; */
import LoadingPage from "./LoadingPage";
import OtpAuth from "./OtpAuth";

function AppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay using setTimeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timer on unmount (component will be unmounted after Home is rendered)
    return () => clearTimeout(timer);
  }, []);

  return loading ? <LoadingPage /> : <OtpAuth />;
}

export default AppLoader;
