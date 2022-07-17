import DisplayData from './components/DisplayData';
import NewWorkWesh from './components/newWorkSesh';
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



function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar/>
        <Switch>

            <Route exact path="/">
              <Landing/>
            </Route>

            <Route  path="/display">
              <DisplayData/>
            </Route>

            <Route  path="/work">
              <NewWorkWesh/>
            </Route>

            <Route  path="/timer/:id">
              <Timer/>
            </Route>

            <Route  path="/goodWork">
              <GoodWork/>
            </Route>

            <Route  path="/break">
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


        </Switch>
      </div>
    </Router>
  );
}

export default App;
