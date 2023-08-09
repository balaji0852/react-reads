import { Component } from "react";
import { Button, FormGroup, Label, Input, Col, Form, Row } from 'reactstrap';

class Bill extends Component {

    constructor(props){
        super(props);

        this.state = {
            kms:0,
            hours:0,
            dayOfWeek:1,
            WeightingHours:0,
            billAmount :-1
        }
    }


    onChangeParameters(event){
        let update = this.state;

        update[event.target.id] = event.target.value;

        this.setState({
            state: update
        })

        console.log("ocp",this.state)
    }


    update(){
        fetch(`http://localhost:8080/api/v1/invoice/PriceCalculator?kms=${this.state.kms}&hours=${this.state.hours}&dayOfWeek=${this.state.dayOfWeek}&WeightingHours=${this.state.WeightingHours}`).
        then((response) => response.json()).then((amount) => {
            console.log(amount);
            this.setState({
                billAmount :amount  
            })
        })
    }

    render() {
        return <div >
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>Kilometers driven </div>
                    <Input id="kms" onChange={this.onChangeParameters.bind(this)} />
                </div>
            </Col>
            <br/>
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>Waiting -mins </div>
                    <Input id="WeightingHours" onChange={this.onChangeParameters.bind(this)} />
                </div>
            </Col>
            <br/>
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>day </div>
                    <Input type="select" name="select" id="dayOfWeek"
                        onChange={this.onChangeParameters.bind(this)} >
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
            <br/>
            <Col sm="10" md={{ size: 4, offset: 2 }}>
                <div className="flex ">
                    <div>total ride duration </div>
                    <Input id="hours"  onChange={this.onChangeParameters.bind(this)} />
                </div>
            </Col>
            <br/>
            <br/>
            <br/>
            <div className="flex justifyItem2">
                <Button onClick={() => this.update()}>Generate bill</Button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            { this.state.billAmount>0 && <h2>Total bill amount {this.state.billAmount} $</h2>}
        </div>;
    }
}



export default Bill;