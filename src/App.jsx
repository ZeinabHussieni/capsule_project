import "./Styles/App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Navbar from "./Components/Shared/Navbar";
import "./Styles/variable.css"
import SideBar from "./Components/Shared/SideBar";
import HomePage from "./Pages/HomePage/HomePage";
import Welcome from "./Components/Landing/Welcome";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";


{/*const discluded = ["/profile", "/auth"];*/}

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
    {/*{discluded.every((route) => route !== location.pathname) && <SideBar />}*/}
      <MyRoutes />
    </div>
  );
};

export default App;

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homePage" element={<HomePage/>} />
    </Routes>
  );
};
