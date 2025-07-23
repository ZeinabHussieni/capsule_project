import "./Styles/App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import HomePage from "./Pages/HomePage/HomePage";
import PrivateCapsulePage from "./Pages/PrivateCapsulePage/PrivateCapsulePage";
import AppLayout from "./Components/Shared/Layouts/AppLayout";
import PublicCapsules from "./Pages/PublicCapsules/PublicCapsules"
import CapsulesDetails from "./Pages/CapsuleDetailsPage/CapsuleDetailsPage";
import CreateCapsule from "./Pages/CreateCapsule/CreateCapsule";
import UpdateCapsule from "./Components/updateCapsule/UpdateCapsule";
import UnlistedPage from "./Pages/UnlistedPage/UnlistedPage"
import Map from "./Components/map/Map";
import "./Styles/variable.css"

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
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
          <Route path="/update_capsule" element={<UpdateCapsule />} />
          <Route path="/unlisted_page" element={<UnlistedPage />} />
          <Route path="/map" element={<Map />} />

        </Route>
      </Routes>
  );
};
