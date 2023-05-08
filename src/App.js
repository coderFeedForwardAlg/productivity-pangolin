import DisplayData from './components/DisplayData';
import NewWorkSesh from './components/newWorkSesh';
import NavBar from './components/navBar';
import Timer from './components/timer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import GoodWork from './components/goodWork';
import Break from './components/breake';
import Landing from './components/landing';
import Longin from './components/longin';
import Register from './components/register';
import Reset from './components/reset';
import Dashboard from './components/dashboard';
import Logout from './components/logout';
import NewBreak from './components/NewBreak';
import Settings from './components/Settings';
import Music from "./components/Music";
import Room from './components/Room';
import VideoCall from './components/VideoCall';
import Library from './components/Library';


function App() {
  return (
    <Router>
      <div className='App'>
        <Music/>
        <NavBar/>
        
        <Switch>

            <Route exact path="/">
              <NewWorkSesh/>
            </Route>

            <Route exact path="/landing">
              <Landing/>
            </Route>

            <Route  path="/display">
              <DisplayData/>
            </Route>

            <Route  path="/work">
              <NewWorkSesh/>
            </Route>

            <Route  path="/timer/:id">
              <Timer/>
            </Route>

            <Route  path="/goodWork/:time">
              <GoodWork/>
            </Route>

            <Route  path="/break/:timeparam">
              <Break/>
            </Route>

            <Route  path="/login">
              <Longin/>
            </Route>

            <Route  path="/register">
              <Register/>
            </Route>

            <Route  path="/reset">
              <Reset/>
            </Route>

            <Route  path="/dashboard">
              <Dashboard/>
            </Route>

            <Route  path="/logout">
              <Logout/>
            </Route>

            <Route  path="/display">
              <DisplayData/>
            </Route>

            <Route  path="/new/break">
              <NewBreak/>
            </Route>

            <Route  path="/settings">
              <Settings/>
            </Route>
            <Route  path="/room">
              <Room/>
            </Route>
            <Route  path="/call">
              <VideoCall/>
            </Route>
            <Route path="/library">
              <Library/>
            </Route>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
