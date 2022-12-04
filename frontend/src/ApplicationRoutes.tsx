import { Routes, Route } from "react-router-dom";
import { AstronautProfile } from "./pages/AstronautProfile";
import { AstronautsDashboard } from "./pages/AstronautsDashboard";
import { EditAstronaut } from "./pages/EditAstronaut";
import { Home } from "./pages/Home";

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/astronautsDashboard" element={<AstronautsDashboard />} />
      <Route path="/astronaut/:id" element={<AstronautProfile />} />
      <Route path="/editAstronaut/:id" element={<EditAstronaut />} />
      <Route path="/newAstronaut" element={<EditAstronaut />} />
    </Routes>
  );
};
