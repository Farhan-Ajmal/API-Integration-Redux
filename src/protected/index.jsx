import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Protected = ({Component}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate("/");
    }
   
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
