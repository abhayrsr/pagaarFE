import "./App.css";
import Login from "./LogIn/login.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./Provider/authProvider.js";
import Dashboard from "./Dashboard/dashboard.js";

function App() {
  const { token } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {token ? <Dashboard /> : <Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
