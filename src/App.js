import "./App.css";
import Login from "./LogIn/login.js";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./Provider/authProvider.js";
import Dashboard from "./Dashboard/dashboard.js";

function App() {
  const { token } = useAuth();
  console.log("app:" , token);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
