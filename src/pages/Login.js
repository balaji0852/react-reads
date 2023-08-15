import { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css"
import { Counter, NewReducerInsteadOfState, TestingForwardRef,TestingUseRef,UpdaterFunctionDemo } from "./funcComponents/testingRef";
class Login extends Component{


    render(){
        return <div className="">
            <Counter/>
            <br/>
            <TestingForwardRef />
            <UpdaterFunctionDemo/>
            <TestingUseRef/>
            <NewReducerInsteadOfState/>
        </div>
    }
}


export default Login;