import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Authentication/Login";
import RequireAuth from "./Component/Authentication/RequireAuth";
import SignUp from "./Component/Authentication/SignUp";
import Drower from "./Component/Home/Drower";
import Navber from "./Component/Home/Navber";

function App() {
  return (
    <div className="bg-black">
      <Navber></Navber>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>
          }
        ></Route>
        {/* <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Drower></Drower>
            </RequireAuth>
          }
        ></Route> */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Routes>
      {/* <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Drower></Drower>
          </RequireAuth>
        }
      >
   
      </Route> */}
    </div>
  );
}

export default App;
