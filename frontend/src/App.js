import './App.css';
import Topbanner from "./components/Topbanner";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PropertyDetail from './pages/PropertyDetail';
import ProfileSetting from "./pages/ProfileSetting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const currentUser = true;
  return (
    <Router>
      <Topbanner />
      <Navbar />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/property"><Home /></Route>
        <Route path="/register">{currentUser ? <Home /> : <Register />}</Route>
        <Route path="/login">{currentUser ? <Home /> : <Login />}</Route>
        <Route path="/api/property/:id"><PropertyDetail /></Route>
        <Route path="/manage">{currentUser ? <Admin /> : <Login />}</Route>
        <Route path="/profile">{currentUser ? <ProfileSetting /> : <Login />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
