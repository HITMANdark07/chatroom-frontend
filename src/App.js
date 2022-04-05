import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Home from "./pages/Home/Home";
import "./App.css";
import Register from "./pages/Register/Register";
import { API } from './api.config';

function App() {
  const [socketConnection, setSocketConnection] = useState(null);
  const [user, setUser] = useState(null);
  const [gender, setGender] = React.useState('male');
  const [name, setName] = useState("");
  useEffect(() => {
    if (!socketConnection && name) {
      const socket = socketIOClient(API,{
        query: {
          name: name,
          gender:gender
        }
      });
      setSocketConnection(socket);
      socket.on("connected", (response) => {
        setUser(response);
      });
    }
    // eslint-disable-next-line
  }, [socketConnection, name]);
  return (
    <Router>
      <Routes>
        {
          name ?
          <>
          <Route
          path="/"
          element={<Home socket={socketConnection} user={user} />}
          />
          </>
          :
          <Route 
          path="/"
          element={<Register gender={gender} setGender={setGender} setName={setName} />}
          />
        }
      </Routes>
    </Router>
  );
}

export default App;
