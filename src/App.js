import "./App.css";
import Cctv from "./cctv";
import LoginForm from "./loginForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

function App() {
  const isLoggedIn = localStorage.getItem("authToken");
  console.log("issloggedIn", isLoggedIn);
  return (
    <>
      <Router>
      <Routes>
        <Route path="/cctv" element={!isLoggedIn ? <LoginForm /> : <Cctv />} />
        <Route path="/" element={isLoggedIn ? <Cctv /> : <LoginForm />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
