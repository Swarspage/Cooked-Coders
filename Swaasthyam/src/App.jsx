import { Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx";
import LoginPage from "./LoginPage.jsx";
import WorkerRegistration from "./WorkerRegistration.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<WorkerRegistration />} />
    </Routes>
  );
}

export default App;
