import './App.css';
import DisplayData from './components/DisplayData';
import NewWorkWesh from './components/newWorkSesh';
import NavBar from './components/navBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 


function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar/>
        <Switch>
            <Route exact path="/">
              <h1>landing page</h1>
            </Route>
            <Route  path="/display">
              <DisplayData/>
            </Route>
            <Route  path="/work">
              <NewWorkWesh/>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
