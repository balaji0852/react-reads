import { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input, Col, Form, Row } from 'reactstrap';
import "../App.css";

class AddConfigs extends Component {


    constructor(props) {
        super(props);
        this.state = {
            config: this.props.state["config"]["configurationID"] == undefined ? {
                configurationID: -1,
                configType: 1,
                configTypeName: "DBP",
                priceForConfiguration: " ",
                rateForConfiguration: " ",
                configurationForKM: " ",
                configurationForTime: " ",
                dayOfTheWeek: 1,
                configEnabled: true
            } : this.props.state['config']
        }
    }

    componentWillUnmount() {
        console.log("cwu")
        this.cleanup();
    }


    cleanup() {
        let state = {
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
            type: 'editConfig', payload: state
        });
    }


    onChange(event) {
        let update = this.state.config;

        update[event.target.id] = event.target.value;

        console.log("confi-----g", update)
        this.setState({
            config: update
        })

    }

    update() {
        let configType = this.state["config"]["configType"];
        let update = {
            configType: this.state["config"]["configurationID"] != undefined ? this.state["config"]["configType"] : 1,
            configTypeName: this.state["config"]["configurationID"] != undefined ?configType==1?"DBP":configType==2?"DAP":configType==3?"TMF": "WC":"DBP",
            priceForConfiguration: this.state["config"]["configurationID"] != undefined ? this.state["config"]["priceForConfiguration"] : 1,
            rateForConfiguration: this.state["config"]["configurationID"] != undefined ? this.state["config"]["rateForConfiguration"] : 1,
            configurationForKM: this.state["config"]["configurationID"] != undefined ? this.state["config"]["configurationForKM"] : 1,
            configurationForTime: this.state["config"]["configurationID"] != undefined ? this.state["config"]["configurationForTime"] : 1,
            dayOfTheWeek: this.state["config"]["configurationID"] != undefined ? this.state["config"]["dayOfTheWeek"] : 1,
            configEnabled: this.state["config"]["configurationID"] != undefined ? this.state["config"]["configEnabled"] : true
        }
        if (this.state["config"]["configurationID"] != -1) {
            update = {
                configurationID: this.state["config"]["configurationID"],
                ...update
            }
        }

        fetch('http://localhost:8081/api/v1/add/PricingConfiguration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
        }).then((response) => response).then((response) => {
            console.log(response);
        })
        window.location.href = "configs"
        this.cleanup();
    }

    componentDidUpdate() {
        console.log("nextprops", this.state);
    }


    render() {
        return <div className="addConfigs">
            <h2>{this.state["config"]["configurationID"] != -1 ? "edit" : "add"} config</h2>


            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>price </div>
                    <Input id="priceForConfiguration" onChange={this.onChange.bind(this)} value={this.state["config"]["priceForConfiguration"]} />
                </div>
            </Col>
            <br />
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>rate </div>
                    <Input id="rateForConfiguration" value={this.state["config"]["rateForConfiguration"]} onChange={this.onChange.bind(this)} />
                </div>
            </Col>
            <br />
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div >hours </div>
                    <Input id="configurationForTime" value={this.state["config"]["configurationForTime"]} onChange={this.onChange.bind(this)} />
                </div>
            </Col>
            <br />
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>kilometers </div>
                    <Input id="configurationForKM" value={this.state["config"]["configurationForKM"]} onChange={this.onChange.bind(this)} />
                </div>
            </Col>
            <br />
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>configuration type </div>
                    <Input type="select" name="select" id="configType" value={this.state["config"]["configType"]}
                        onChange={this.onChange.bind(this)}>
                        <option value="1">DBP</option>
                        <option value="2">DAP</option>
                        <option value="3">TMF</option>
                        <option value="4">WC</option>
                    </Input>
                </div>
            </Col>
            <br />
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>configuration type </div>
                    <Input type="select" name="select" id="dayOfTheWeek" value={this.state["config"]["dayOfTheWeek"]}
                        onChange={this.onChange.bind(this)}>
                        <option value="1">sunday</option>
                        <option value="2">monday</option>
                        <option value="3">tuesday</option>
                        <option value="4">wednesday</option>
                        <option value="5">thursday</option>
                        <option value="6">friday</option>
                        <option value="7">saturday</option>
                    </Input>
                </div>
            </Col>
            <br />
            <div className="flex justifyItem2">
                <Button onClick={() => this.update()}>{this.state["config"]["configurationID"] != -1 ? "edit" : "add"}</Button>
            </div>

        </div>
    }
}


AddConfigs.propTypes = {
    state: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return ({
        state: state
    });
};


export default connect(mapStateToProps)(AddConfigs);