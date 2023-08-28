import React, { Component } from "react";
import UserService from '../services/UserService';

class ViewGatewayComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            gateway: {}  // Initialize the state with an empty object for gateway
        };
    }

    componentDidMount() {
        // Use the id from the state to construct the URL
        fetch(`http://127.0.0.1:5000/gateways/${this.state.gateway_id}`)
            .then((response) => response.json())
            .then((res) => {
                this.setState({ gateway: res.data });
            })
            .catch((error) => {
                console.error("Error fetching gateway details:", error);
            });
    }

    render() {
        const { gateway } = this.state;
        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Gateway Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Gateway Name:</label>
                            <div>{this.state.gateway_name}</div>
                        </div>
                        <div className="row">
                            <label>Mac Address:</label>
                            <div>{this.state.mac_address}</div>
                        </div>
                        <div className="row">
                            <label>Gateway Address:</label>
                            <div>{this.state.address}</div>
                        </div>
                        <div className="row">
                            <label>Crop Type:</label>
                            <div>{this.state.cropType}</div>
                        </div>
                        <div className="row">
                            <label>Farming Type:</label>
                            <div>{this.state.farmingType}</div>
                        </div>
                        <div className="row">
                            <label>Farming Area:</label>
                            <div>{this.state.farmingArea}</div>
                        </div>
                        <div className="row">
                            <label>Climate Type:</label>
                            <div>{this.state.climateType}</div>
                        </div>
                        <div className="row">
                            <label>Sensors:</label>
                            <div>{this.state.sensors}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewGatewayComponent;
