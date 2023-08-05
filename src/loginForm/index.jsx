import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Perform login logic here, e.g., send login request to the server
  //     const loginData = {
  //       username: email,
  //       password: password,
  //     };
  
  //     try {
  //       const response = await fetch(
  //         "https://eservices.dhai-r.com.pk/api/pims/login",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(loginData),
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         const authToken = data.data_array.token; // Extract the token from the response
  //         setMessage(data.message);
  //         console.log("Received authentication token:", authToken); // Log the token here
  
  //         if (authToken !== undefined) {
  //           // Store the token in local authTokenstorage
  //           localStorage.setItem("authToken", authToken);
  //         }
  //         const storedToken = localStorage.getItem("authToken");
  //         if (storedToken) {
  //             // toast.success("Logged In Successfully", {
  //             //   position: toast.POSITION.BOTTOM_CENTER,
  //             // });
  //             navigate("/cctv"); // Navigate to the desired page after successful login
  //         } else {
  //           navigate("/");
  //           // Navigate to the desired page after successful login
  //         }
  //         return authToken; // Return the token from the function
          
  //       } else {
  //         console.error("Login failed:", response.statusText);
  //         throw new Error("Invalid username or password"); // Throw an error for unsuccessful login
  //       }
  //     } catch (error) {
  //       console.error("error:", error.message);
  //       throw error;
  //     }
      
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://eservices.dhai-r.com.pk/api/pims/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("login data -------===========",data);
        const authToken = data.data_array.token; // Extract the token from the response
        setMessage(data.message); // Log the token here

        if (authToken !== undefined) {
          // Store the token in local authTokenstorage
          localStorage.setItem("authToken", authToken);
        }
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            // toast.success("Logged In Successfully", {
            //   position: toast.POSITION.BOTTOM_CENTER,
            // });
          navigate("/cctv"); // Navigate to the desired page after successful login
        } 

        else {
          navigate("/"); // Navigate to the desired page after successful login

        }
        console.log("Logged in --------");
        return authToken; // Return the token from the function
        
      } else {
        console.error("Login failed:", response.statusText);
        throw new Error("Invalid username or password"); // Throw an error for unsuccessful login
      }
    } catch (error) {
      console.error("error:", error.message);
      throw error;
    }
  };
  return (
    <form>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>Login</button>
    </form>
  );
};

export default LoginForm;
