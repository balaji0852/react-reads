
import { Component } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import './App.css';
import Bill from './pages/Bill';
import MainLayout from './pages/MainLayout';
import AddConfigs from './pages/AddConfigs';
import Login from './pages/Login';
import configs from './pages/Configs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route index path='/' Component={Login} />
            <Route path='/Home' Component={MainLayout} >
              <Route path="Bill" Component={Bill} />
              <Route path="configs" Component={configs} />
              <Route path="add" Component={AddConfigs} />
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }


}

configs.propTypes = {
  state:PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  
  return ({
      state: state
  });
};


export default connect(mapStateToProps)(App);
