import React, { Component } from 'react';
import UserService from '../services/UserService';

class UpdateGatewayComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gateway_id: this.props.match.params.id,
            gateway_name: '',
            mac_address: '',
            address: '',
            cropType: '',
            farmingType: '',
            farmingArea: '',
            climateType: '',
            sensors: '',
        };

       this.changegateway_nameHandler = this.changegateway_nameHandler.bind(this);
        this.changemac_addressHandler = this.changemac_addressHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.changeCropTypeHandler = this.changeCropTypeHandler.bind(this);
        this.changeFarmingTypeHandler = this.changeFarmingTypeHandler.bind(this);
        this.changeFarmingAreaHandler = this.changeFarmingAreaHandler.bind(this);
        this.changeClimateTypeHandler = this.changeClimateTypeHandler.bind(this);
        this.changeSensorsHandler = this.changeSensorsHandler.bind(this);
        this.updateGateway = this.updateGateway.bind(this);

        this.updateGateway = this.updateGateway.bind(this);
    }

    componentDidMount() {
        UserService.getGatewayById(this.state.gateway_id).then((res) => {
            let gateway = res.data;
            this.setState({
                gateway_name: gateway.gateway_name,
                mac_address: gateway.mac_address,
                address: gateway.address,
                cropType: gateway.cropType,
                farmingType: gateway.farmingType,
                farmingArea: gateway.farmingArea,
                climateType: gateway.climateType,
                sensors: gateway.sensors,
            });
        });
    }

    updateGateway(e) {
        e.preventDefault();
        let gateway = {
            gateway_name: this.state.gateway_name,
            mac_address: this.state.mac_address,
            address: this.state.address,
            cropType: this.state.cropType,
            farmingType: this.state.farmingType,
            farmingArea: this.state.farmingArea,
            climateType: this.state.climateType,
            sensors: this.state.sensors,
        };

        fetch(`http://127.0.0.1:5000/gateways/${this.state.gateway_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gateway),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Data saved:', result);
            })
            .catch((error) => {
                console.error('Error saving data:', error);
            });

        UserService.updateGateway(gateway, this.state.gateway_id).then((res) => {
            this.props.history.push('/gateways');
           
        });
        }
    
    // Your change handler methods
    // ...

   render() {
        return (
            <div>
                <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Gateway</h3>
                        <div className="card-body">
                            <form >
                            <div className='form-group'>
                                    <label>Gateway Name:</label>
                                    <input placeholder='this.state.gateway_name' name='gateway_name' className='form-control'
                                    value={this.state.gateway_name} onChange={this.changegateway_nameHandler} />
                                </div>
                                <div className='form-group'>
                                <label>Mac Address:</label>
                                <input placeholder='Mac Address' name='mac_address' className='form-control'
                                    value={this.state.mac_address} onChange={this.changemac_addressHandler} />
                                    </div> 
                                    <div className='form-group'>
                                <label>Gateway Address:</label>
                                <input placeholder='Gateway Address' name='address' className='form-control'
                                    value={this.state.address} onChange={this.changeaddressHandler} />
                                    </div> 
                                    <div className='form-group'>
                                <label>Crop Type:</label>
                                <input placeholder='Crop Type' name='cropType' className='form-control'
                                    value={this.state.cropType} onChange={this.changeCropTypeHandler} />
                                    </div>
                                    <div className='form-group'>
                                <label>Farming Type:</label>
                                <input placeholder='Farming Type' name='farmingType' className='form-control'
                                    value={this.state.farmingType} onChange={this.changeFarmingTypeHandler} />
                                    </div> 
                                    <div className='form-group'>
                                <label>Farming Area:</label>
                                <input placeholder='Farming Area' name='farmingArea' className='form-control'
                                    value={this.state.farmingArea} onChange={this.changeFarmingAreaHandler} />
                                    </div> 
                                    <div className='form-group'>
                                <label>Climate Type:</label>
                                <input placeholder='Climate Type' name='climateType' className='form-control'
                                    value={this.state.climateType} onChange={this.changeClimateTypeHandler} />
                                    </div>
                                    <div className='form-group'>
                                <label>Sensors:</label>
                                <input placeholder='Sensors' name='sensors' className='form-control'
                                    value={this.state.sensors} onChange={this.changeSensorsTypeHandler} />
                                    </div> 
                                <button className="btn btn-success" onClick={this.updateGateway}>Save</button>
                                <button className="btn btn-success" onClick={this.cancel.bind(this)} style={{marginLeft:"10 px"}}>Cancel</button>
                            </form>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        );
    }
}

export default UpdateGatewayComponent;