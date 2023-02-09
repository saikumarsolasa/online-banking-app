import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/admin/create-user";
import UserDetails from "./pages/admin/user-details";
import DashBoard from "./pages/admin";
import Login from "./pages/login";
import UserDashBoard from "./pages/user";
import ProtectedRoute from "./componnets/protected-route";
import UserProtectedRoute from "./componnets/user-protected-route";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >
          <Route
            path="create-user"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-user/:id"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="user-details"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/user"
          element={
            <UserProtectedRoute>
              <UserDashBoard />
            </UserProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
