import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/cctv");
      } else {
        navigate("/");
      }
    }, [isLoggedIn, navigate]);
  
    return <div>Page Not Found</div>;
  };
   
  export default NotFound