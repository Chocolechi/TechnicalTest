import React from 'react'
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './components/Dashboard';
import New from './components/New';
import Edit from './components/Edit';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (

    <React.Fragment>
      <Router>
        <Routes>
          {/* <Route path='/' exact render = { props => ( <Navbar {...props} />)}></Route> */}
          <Route path='/' element={<Dashboard  />}></Route>
          <Route path='/edit/:id' element={<Edit />}></Route>
          <Route path='/New' element={<New/>}></Route>


        </Routes>
      </Router>

    </React.Fragment>

  );
}

export default App;
