import "./App.css";
import AllImage from "./Pages/AllImage/AllImage";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import { Home } from "./Pages/Home/Home";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useContext, useReducer } from "react";
import { intialState, reducer } from "./Component/Reducers";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "user", payload: user });
    } else {
      navigate("/login");
    }
    console.log(user);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/allimage" element={<AllImage />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
