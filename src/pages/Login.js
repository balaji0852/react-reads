import { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css"

class Login extends Component{


    render(){
        return <div className="Login">
            <Link to="/Home/Bill">Home</Link>
        </div>
    }
}


export default Login;