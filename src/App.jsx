import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Readme from "./pages/Readme";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      {token && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/readme"
          element={
            <PrivateRoute>
              <Readme />
            </PrivateRoute>
          }
        />
         <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;