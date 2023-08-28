import hashlib

class GatewayModel:
    def __init__(self, gateway_name=None, address=None, sensors=None, cropType=None,
                 climateType=None, mac_address=None, farmingType=None):
        self.gateway_id = hashlib.sha256(mac_address.encode()).hexdigest()
        self.gateway_name = gateway_name
        self.mac_address = mac_address
        self.address = address
        self.sensors = sensors
        self.cropType = cropType
        self.climateType = climateType
        self.farmingType = farmingType
