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
import Protected from "./protected";
import AboutUs from "./aboutUs";

function App() {
  const isLoggedIn = localStorage.getItem("authToken");
  console.log("isLoggedIn", isLoggedIn);

  return (
    <Router>
      <Routes>  
        <Route path="/cctv" element={<Protected Component={Cctv} />} />
        <Route path="/about" element={<Protected Component={AboutUs} />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
{/* <Protected Component={AboutUs} /> */}