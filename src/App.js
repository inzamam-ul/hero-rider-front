import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Componenets/Login";
import { AuthProvider, PrivateRoute } from "./lib/auth";
import SignUpForm from "./Componenets/SignUpForm";
import Profile from "./Componenets/Profile";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Hello</h1>} />
            <Route path="/login" element={<Login />}></Route>

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/login/rider" element={<SignUpForm rider={true} />} />
            <Route
              path="/login/Learner"
              element={<SignUpForm rider={false} />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
