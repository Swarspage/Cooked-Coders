import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.jsx";
import LoginPage from "./LoginPage.jsx";
import OfficerRegistration from "./OfficerRegistration.jsx";
import OfficialRegistration from "./OfficialRegistration.jsx";
import OfficerDashboard from "./OfficerDashboard.jsx";
import WorkerRegistration from "./WorkerRegistration.jsx";
import OfficialDashboard from "./OfficialDashboard.jsx";
import MigrantDashboard from "./MigrantDashboard.jsx";
function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Officer & Official registrations */}
      <Route path="/register-officer" element={<OfficerRegistration />} />
      <Route path="/register-official" element={<OfficialRegistration />} />

      {/* Dashboard routes */}
      <Route path="/officer" element={<OfficerDashboard />} />
      <Route path="/official-dashboard" element={<OfficialDashboard />} />
      <Route path="/migrant-dashboard" element={<MigrantDashboard />} />
      <Route path="/register-worker" element={<WorkerRegistration />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
