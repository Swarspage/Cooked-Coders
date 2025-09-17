import { Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx";
import LoginPage from "./LoginPage.jsx";
import OfficerRegistration from "./OfficerRegistration.jsx";
import OfficialRegistration from "./OfficialRegistration.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-officer" element={<OfficerRegistration />} />
      <Route path="/register-official" element={<OfficialRegistration />} />
    </Routes>
  );
}

export default App;
