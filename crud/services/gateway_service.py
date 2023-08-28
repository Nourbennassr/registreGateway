from dtos.gateway_dto import GatewayDTO
from models.gateway_model import GatewayModel

class GatewayService:
    def __init__(self):
        self.gateways = []

    def create_gateway(self, gateway_dto):
       gateway_model = GatewayModel(
            gateway_name=gateway_dto.gateway_name,
            address=gateway_dto.address,
            sensors=gateway_dto.sensors,
            cropType=gateway_dto.cropType,
            climateType=gateway_dto.climateType,
            mac_address=gateway_dto.mac_address,
            farmingType=gateway_dto.farmingType
        )
       self.gateways.append(gateway_model)
    def get_gateway_by_id(self, gateway_id):
        for gateway in self.gateways:
            if gateway.gateway_id == gateway_id:
                return gateway
        return None

    def update_gateway(self, gateway_id, updated_gateway_dto):
        for gateway in self.gateways:
            if gateway.gateway_id == gateway_id:
                for key, value in updated_gateway_dto.__dict__.items():
                    setattr(gateway, key, value)
                return True
        return False

    def delete_gateway(self, gateway_id):
        self.gateways = [gateway for gateway in self.gateways if gateway.gateway_id != gateway_id]

    def get_all_gateways(self):
        return self.gateways
