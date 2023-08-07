import { Component } from "react";
import "../App.css";
import {
    BrowserRouter as Router,
    Routes ,
    Route,
    Link,
    Outlet
} from "react-router-dom";
import Bill from "./Bill";
import configs from "./Configs";
import AddConfigs from "./AddConfigs";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class MainLayout extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    



    render() {
        return <div className="App">
            <div className="AppBar">
                <Link to="/Home/bill"><div>Bill</div></Link>
                <Link to="/Home/configs"><div>Manage Configurations</div></Link>
                <Link to="/Home/add"><div>Add Configurations</div></Link>
            </div>
            <div className="top">top</div>
            <Outlet/>
        </div>;
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


export default connect(mapStateToProps)(MainLayout);