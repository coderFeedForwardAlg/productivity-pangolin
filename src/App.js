import DisplayData from './components/DisplayData';
import NewWorkSesh from './components/NewWorkSesh';
import NavBar from './components/NavBar';
import Timer from './components/Timer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import GoodWork from './components/GoodWork';
import Break from './components/Breake';
import Landing from './components/landing';
import Longin from './components/Longin';
import Register from './components/Register';
import Reset from './components/reset';
import Dashboard from './components/dashboard';
import Logout from './components/Logout';
import NewBreak from './components/NewBreak';
import Settings from './components/Settings';



function App() {
  return (
    <Router>
      <div className='App'>
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


        </Switch>
      </div>
    </Router>
  );
}

export default App;
