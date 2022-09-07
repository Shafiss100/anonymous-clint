import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Authentication/Login";
import RequireAuth from "./Component/Authentication/RequireAuth";
import SignUp from "./Component/Authentication/SignUp";

function App() {
  return (
    <div className="bg-black">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Routes>
    </div>
  );
}

export default App;
