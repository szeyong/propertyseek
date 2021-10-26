import Topbanner from "./components/Topbanner";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PropertyDetail from './pages/PropertyDetail';
import ProfileSetting from "./pages/ProfileSetting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  // const currentUser = false;
  return (
    <Router>
      <Topbanner />
      <Navbar />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/posts"><Home /></Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/property/:id"><PropertyDetail /></Route>
        <Route path="/manage">{user ? <AddProperty /> : <Login />}</Route>
        <Route path="/settings">{user ? <ProfileSetting /> : <Login />}</Route>
        <Route path="/edit">{user ? <EditProperty /> : <Login />}</Route>
      </Switch>

    </Router>
  );
}

export default App;
