import "./App.css";
import Cctv from "./cctv";
import LoginForm from "./loginForm";
import NotFound from "./notFound";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Protected from "./protected";
import AboutUs from "./aboutUs";
import Vehicle from "./vehicle";

function App() {
  const isLoggedIn = localStorage.getItem("authToken");
  console.log("isLoggedIn", isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route path="/cctv" element={<Protected Component={Cctv} />} />
        <Route path="/about" element={<Protected Component={AboutUs} />} />
        <Route path="/vehicle" element={<Protected Component={Vehicle} />} />
        <Route path="/" element={<LoginForm />} />
        <Route
          path="*"
          element={<NotFound /> }
        />
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   const isLoggedIn = localStorage.getItem("authToken");
//   const routes = useRoutes([
//     {
//       path: "/",
//       element: isLoggedIn ? <Navigate to="/vehiclepage" replace /> : <Login />,
//     },

//     isLoggedIn
//       ? {
//           element: <Aside />,
//           children: [
//             {
//               path: "/vehiclepage",
//               element: <Vehiclepage />,
//             },
//             {
//               path: "/eservicespage",
//               element: <Eservicespage />,
//             },
//             {
//               path: "/cctvpage",
//               element: <Cctvpage />,
//             },
//             {
//               path: "/dummypage",
//               element: <DummyPage />,
//             },
//             { path: "*", element: <Navigate to="/vehiclepage" /> },
//           ],
//         }
//       : ({
//           path: "/",
//           element: <Login />,
//         },
//         {
//           path: "*",
//           element: <Navigate to="/" />,
//         }),
//     {
//       path: "*",
//       element: isLoggedIn ? (
//         <Navigate to="/vehiclepage" replace />
//       ) : (
//         <Navigate to="/" replace />
//       ),
//     },
//   ]);
//   return <div className="App">{routes}</div>;
// }
