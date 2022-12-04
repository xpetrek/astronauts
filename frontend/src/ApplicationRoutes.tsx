import { Routes, Route } from "react-router-dom";
import { ShowAstronautProfile } from "./pages/ShowAstronautProfile";
import { AstronautsDashboard } from "./pages/AstronautsDashboard";
import { Home } from "./pages/Home";
import { UnderConstruction } from "./pages/UnderConstruction";

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/astronautsDashboard" element={<AstronautsDashboard />} />
      <Route path="/astronaut/:id" element={<ShowAstronautProfile />} />
      <Route path="/astronaut/" element={<ShowAstronautProfile />} />
      <Route path="/development/" element={<UnderConstruction />} />
    </Routes>
  );
};
