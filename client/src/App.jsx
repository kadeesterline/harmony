import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";
import New from "./Pages/New";
import Room from "./Pages/Room";
import SideBar from "./Components/SideBar";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { UserProvider } from "./Context/UserContext";

function NavLayout() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<NavLayout />}>
            <Route path="/room/:id" element={<Room />} />
            <Route path="/new" element={<New />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404</p>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
