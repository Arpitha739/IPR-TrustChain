import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

import CreatorDashboard from "./pages/CreatorDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";

import PublicVerification from "./pages/PublicVerification";
import IPPassport from "./pages/IPPassport";
import VerifyIP from "./pages/VerifyIP";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {

  return (

    <BrowserRouter>

      <AuthProvider>

        <Routes>

          {/* PUBLIC ROUTES */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Public verification - QR opens here */}

          <Route
            path="/verify/:ipIdentifier"
            element={<PublicVerification />}
          />

          {/* Optional manual verification page */}

          <Route
            path="/verify"
            element={<VerifyIP />}
          />


          {/* PROTECTED ROUTES */}

          {/* CREATOR ROUTES */}

<Route
  element={
    <ProtectedRoute
      allowedRoles={["CREATOR"]}
    />
  }
>

  <Route
    path="/creator/dashboard"
    element={<CreatorDashboard />}
  />

  <Route
    path="/passport/:id"
    element={<IPPassport />}
  />

</Route>


{/* VERIFIER ROUTES */}

<Route
  element={
    <ProtectedRoute
      allowedRoles={["VERIFIER"]}
    />
  }
>

  <Route
    path="/verifier/dashboard"
    element={<VerifierDashboard />}
  />

</Route>


{/* ADMIN ROUTES */}

<Route
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
    />
  }
>

  <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
  />

</Route>

        </Routes>

      </AuthProvider>

    </BrowserRouter>

  );

}

export default App;