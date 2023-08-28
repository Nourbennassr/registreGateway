import React, {Component} from 'react' 
import UserService from '../services/UserService'

class CreateGatewayComponent extends Component {
    constructor(props){
    super(props)

    this.state = {
        id:this.props.match.params.id,
        gateway_name:'',
        mac_address:'',
        address:'',
        cropType:'',
        farmingType:'',
      
        climateType:'',
        sensors:''
    }
    this.changegateway_nameHandler = this.changegateway_nameHandler.bind(this) ;
    this.changemac_addressHandler = this.changemac_addressHandler.bind(this);
    this.changeaddressHandler = this.changeaddressHandler.bind(this);
    this.changeCropTypeHandler = this.changeCropTypeHandler.bind(this);
    this.changeFarmingTypeHandler = this.changeFarmingTypeHandler.bind(this);
    
    this.changeClimateTypeHandler = this.changeClimateTypeHandler.bind(this) ;
    this.changeSensorsHandler = this.changeSensorsHandler.bind(this);

    this.saveOrUpdateGateway = this.saveOrUpdateGateway.bind(this);
 }
 
 saveGatewayData = () => {
    const gatewayData = {
        gateway_name: this.state.gateway_name,
        mac_address: this.state.mac_address,
        address: this.state.address,
        cropType: this.state.cropType,
        farmingType: this.state.farmingType,
       
        climateType: this.state.climateType,
        sensors: this.state.sensors,
    };

    fetch('http://127.0.0.1:5000/gateways', {
            method: 'POST', // Utilisez 'PUT' si vous mettez à jour des données existantes
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gatewayData),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Data saved:', result);
            
        })
        .catch(error => {
            console.error('Error saving data:', error);
           
        });}
 
 componentDidMount(){
    if(this.state.id === '_add'){
        return
    } else {
        UserService.getGatewayById(this.state.id).then((res) => {
            let gateway =res.data ;
            this.setState ({
                gateway_name:gateway.gateway_name,
                mac_address:gateway.mac_address,
                address:gateway.address,
                cropType:gateway.cropType,
                farmingType:gateway.farmingType,
                /*farmingArea:gateway.farmingArea,*/
                climateType:gateway.climateType,
                sensors:gateway.sensors
            });
        });
    }
}

 saveOrUpdateGateway = (e) => {
    e.preventDefault();
    let gateway = {gateway_name: this.state.gateway_name,
    mac_address: this.state.mac_address,
    address: this.state.address,
    cropType: this.state.cropType,
    farmingType: this.state.farmingType,
    farmingArea: this.state.farmingArea,
    climateType: this.state.climateType,
    sensors: this.state.sensors,
    }
    console.log('gateway =>'+ JSON.stringify(gateway));

 if(this.state.id === '_add'){
UserService.createGateway(gateway) 
.then((res) => {
    this.props.history.push('/gateways');
});
}else{
    UserService.updateGateway(gateway, this.state.id).then (res => {
        this.props.history.push('/gateways');
    });
}
 }

 changegateway_nameHandler= (event) => {
    this.setState({gateway_name: event.target.value});
 }
 changemac_addressHandler= (event) => {
    this.setState({mac_address: event.target.value});
 }
 changeaddressHandler= (event) => {
    this.setState({address: event.target.value});
 }
 changeCropTypeHandler= (event) => {
    this.setState({cropType: event.target.value});
 }
 changeFarmingTypeHandler= (event) => {
    this.setState({farmingType: event.target.value});
 }
 changeFarmingAreaHandler= (event) => {
    this.setState({farmingArea: event.target.value}); 
}

 changeClimateTypeHandler= (event) => {
    this.setState({climateType: event.target.value});
 }
 changeSensorsHandler= (event) => {
    this.setState({sensors: event.target.value}); 
}
cancel(){
    this.props.history.push('/gateways');
}

getTitle(){
    if(this.state.id === '_add'){
        return <h3 className='text-center'>Add Gateway</h3>
    }else{
        return <h3 className='text-center'>Update Gateway</h3>
    }
}

render(){
    return(
        <div>
            <br></br>
            <div className='container'>
                <div className='row' >
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {
                            this.getTitle()
                        }
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Gateway Name:</label>
                                    <input placeholder='Gateway Name' name='gateway_name' className='form-control'
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
                                <label>CropType:</label>
                                <input placeholder='Crop Type' name='cropType' className='form-control'
                                    value={this.state.cropType} onChange={this.changeCropTypeHandler} />
                                    </div> 
                                    <div className='form-group'>
                                <label>FarmingType:</label>
                                <input placeholder='Farming Type' name='farmingType' className='form-control'
                                    value={this.state.farmingType} onChange={this.changeFarmingTypeHandler} />
                                    </div> 
                                      
                                    <div className='form-group'>
                                <label>Climate Type:</label>
                                <input placeholder='Climate Type' name='climateType' className='form-control'
                                    value={this.state.climateType} onChange={this.changeClimateTypeHandler} />
                                    </div> 
                                    <div className='form-group'>
                                <label>Sensors:</label>
                                <input placeholder='Sensors' name='sensors' className='form-control'
                                    value={this.state.sensors} onChange={this.changeSensorsHandler} />
                                    </div> 
                                    <br></br>
                                    <button className='btn btn-success' onClick={this.saveGatewayData}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
export default CreateGatewayComponent