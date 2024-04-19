import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "./Components/Pages/Connection";
import Chat from "./Components/Pages/Chat";
import ProtectedRoute from "./Components/Utilities/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="/" element={<ProtectedRoute />} >
          <Route path="/chat/:pseudo" element={<Chat />} />
        </Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
