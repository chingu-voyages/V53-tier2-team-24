import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Allergens from "./pages/Allergens";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/schedule"
        element={
          <MainLayout>
            <Schedule />
          </MainLayout>
        }
      />
      <Route
        path="/allergens"
        element={
          <MainLayout>
            <Allergens />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route path="*" element={<ErrorPage />} /> {/* Fallback route */}
    </Routes>
  );
};

export default App;
