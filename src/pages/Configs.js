import { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


class configs extends Component {


    constructor(props) {
        super(props)
        console.log(props.state)
        this.state = {
            configurationList: []
        }
    }

    getConfigurationList() {
        fetch('http://localhost:8081/api/V1/PricingConfiguration').then((response) => response.json()).then(
            (data) => {
                this.setState({
                    configurationList: data
                })
            }
        )
    }

    componentWillUnmount() {
        this.cleanup();
    }


    cleanup(){
        let _state = {
            config: {
                configurationID: -1,
                configType: 1,
                configTypeName: "DAP",
                priceForConfiguration: 1,
                rateForConfiguration: 1,
                configurationForKM: 1.0,
                configurationForTime: 1.0,
                dayOfTheWeek: 1,
                configEnabled: true
            }
        }

        this.props.dispatch({
            type: 'editConfig', payload: _state
        });
    }

    handleEdit(configuration){
        console.log(configuration)
        this.props.dispatch({
            type: 'editConfig', payload: configuration
        });
       // window.location.href = "/Home/add"
    }

    deleteConfiguration(configuration) {
        
        fetch('http://localhost:8081/api/v1/delete/PricingConfiguration', {
            method: 'DELETE',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(configuration)
        }).then((response) => response).then((response) => {
            console.log(response);
            this.getConfigurationList();
        })
    }

    handleUpdate(configuration){
        let updateConfig = configuration;
        updateConfig['configEnabled'] = !configuration['configEnabled'];
        fetch('http://localhost:8081/api/v1/add/PricingConfiguration', {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(updateConfig)
        }).then((response) => response).then((response) => {
            console.log(response);
            this.getConfigurationList();
        })
    }

    componentDidMount() {
        this.getConfigurationList()
    }

    render() {

        return <div className="Configs">
            {
                this.state.configurationList.length == 0 ? <h1>Pricing configurations are empty</h1> :
                    this.state.configurationList.map((elements,index) =>
                        <div className="CofigItems" key={index}>
                            {
                                <div className="configurationItems">
                                    <h5 className="flex">configuration type : {elements["configTypeName"]}</h5>
                                    {elements["configType"] === 1 && <div className="flex">applicable on: {elements["dayOfTheWeek"]}</div>}
                                    {elements["configType"] != 4 && <div className="flex alignItems">charge for this configuration, price for upto {elements["configurationForKM"]} kms : <h2>${elements["priceForConfiguration"]}</h2></div>}
                                    {elements["configType"] === 2 && <div className="flex">distance additional price after {elements["configurationForKM"]} kms : ${elements["priceForConfiguration"]}</div>}
                                    {elements["configType"] === 3 && <div className="flex">TMF Rate, after {elements["configurationForTime"]} hours  :{elements["rateForConfiguration"]}X</div>}
                                    {elements["configType"] === 4 && <div className="flex alignItems">Weighting charge, WC    :<h2>${elements["priceForConfiguration"]}</h2></div>}
                                    {elements["configType"] === 4 && <div className="flex">applicable after initial {elements["configurationForTime"]} mins ,{elements["priceForConfiguration"]}/mins </div>}
                                    <div className="flex justifyItem"><Link to="/Home/configs"><div onClick={()=>this.handleUpdate(elements)}>{elements["configEnabled"]?"disable":"enable"}</div></Link><div>{" | "}</div><Link to="/Home/add"><div onClick={()=>this.handleEdit(elements)}>Edit</div></Link><div>{" | "}</div><Link><div onClick={() => this.deleteConfiguration(elements)}>Delete</div></Link></div>
                                    <hr />
                                </div>
                            }
                        </div>
                    )
            }
        </div>
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


export default connect(mapStateToProps)(configs);