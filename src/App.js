import DisplayData from './components/DisplayData';
import NewWorkWesh from './components/newWorkSesh';
import NavBar from './components/navBar';
import Timer from './components/timer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import GoodWork from './components/goodWork';
import Break from './components/breake';
import Landing from './components/landing';



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


        </Switch>
      </div>
    </Router>
  );
}

export default App;
