import Sidebar from "./components/sidebar";

import Home from "./pages/home";
import Goals from "./pages/goals";
import Calendar from "./pages/calendar";
import Progress from "./pages/progress";
import Settings from "./pages/settings";
import Skills from "./pages/skills";

import Signup from "./pages/signup";
import Login from "./pages/login";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideSidebar && <Sidebar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </>
  );
};
export default App;