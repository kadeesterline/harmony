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
import { ChannelProvider } from "./Context/ChannelContext";
import { MemberProvider } from "./Context/MemberContext";

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
      <ChannelProvider>
        <MemberProvider>
          <Router>
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/newuser" element={<SignUp />} />
              <Route element={<NavLayout />}>
                <Route path="/room/:id" element={<Room />} />
                <Route path="/new" element={<New />} />
              </Route>
              <Route path="*" element={<p>There's nothing here: 404</p>} />
            </Routes>
          </Router>
        </MemberProvider>
      </ChannelProvider>
    </UserProvider>
  );
}

export default App;
