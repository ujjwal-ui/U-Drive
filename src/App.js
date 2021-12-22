import {Switch, Route} from "react-router-dom";
import './App.css';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import FrontPage from "./components/FrontPage/FrontPage"; 
import DashBoard from "./components/DashBoard/DashBoard";
import {AuthProvider} from "./auth-context";

function App() {

  return (<>
            <AuthProvider>
                <div className="mainContainer">
                  <Switch>
                        <Route path="/" exact><FrontPage /></Route>
                        <Route path="/login" ><Login /></Route>
                        <Route path="/signup"><Signup /></Route>
                        <Route path="/dashboard"><DashBoard /></Route>
                        <Route path="/folder/:folderId"><DashBoard /></Route>
                  </Switch>
                </div>
            </AuthProvider>
          </>
  );
}

export default App;
