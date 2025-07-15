import "./Styles/App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import "./Styles/variable.css"
import HomePage from "./Pages/HomePage/HomePage";
import PrivateCapsulePage from "./Pages/PrivateCapsulePage/PrivateCapsulePage";
import SideBar from "./Components/Shared/SideBar/SideBar";
import AppLayout from "./Components/Shared/Layouts/AppLayout";
import PublicCapsules from "./Pages/PublicCapsules/PublicCapsules"
import CapsulesDetails from "./Pages/CapsuleDetailsPage/CapsuleDetailsPage";
import CreateCapsule from "./Pages/CreateCapsule/CreateCapsule";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
      <Route element={<AppLayout />}>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/usercapsule" element={<PrivateCapsulePage />} />
          <Route path="/publiccapsules" element={<PublicCapsules />} />
          <Route path="/capsulesDetails" element={<CapsulesDetails />} />
          <Route path="/createCapsule" element={<CreateCapsule />} />

        </Route>
      </Routes>
  );
};
