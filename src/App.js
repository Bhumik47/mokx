import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
/* import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage'; */
import ChatPage from './Pages/ChatPage';
import AppLoader from './Pages/AppLoader';
import { UserProvider } from './Auth';


function App() {
  return (

    <Router>
       <UserProvider>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<AppLoader />} />
       {/*    <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> */}
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
        </div>
        </UserProvider>
      </Router>
     
  );
}

export default App;
