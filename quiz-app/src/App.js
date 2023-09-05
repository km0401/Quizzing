import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import JoinRoom from "./pages/JoinRoom"
import Gameplay from "./pages/GamePlay";
import WaitingRoom from "./pages/WaitingRoom";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gameplay/:roomcode"
          element={
            <ProtectedRoute>
              <Gameplay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-room"
          element={
            <ProtectedRoute>
              <JoinRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzing/:roomcode"
          element={
            <ProtectedRoute>
              <WaitingRoom />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
