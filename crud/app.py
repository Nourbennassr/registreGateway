from flask import Flask, request, jsonify
from dtos.gateway_dto import GatewayDTO
from services.gateway_service import GatewayService
from flask_cors import CORS
app = Flask(__name__)

gateway_service = GatewayService()
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/gateways', methods=['POST'])
def create_gateway():
    data = request.json
    gateway_dto = GatewayDTO(**data)
    gateway_service.create_gateway(gateway_dto)
    return jsonify({'message': 'Gateway created successfully'}), 201

@app.route('/gateways/<gateway_id>', methods=['GET'])
def get_gateway(gateway_id):
    gateway = gateway_service.get_gateway_by_id(gateway_id)
    if gateway:
        return jsonify(gateway.__dict__)
    return jsonify({'message': 'Gateway not found'}), 404

@app.route('/gateways', methods=['GET'])
def get_all_gateways():
    gateways = gateway_service.get_all_gateways()
    gateways_data = [gateway.__dict__ for gateway in gateways]
    return jsonify(gateways_data)

@app.route('/gateways/<gateway_id>', methods=['PUT'])
def update_gateway(gateway_id):
    data = request.json
    updated_gateway_dto = GatewayDTO(**data)
    success = gateway_service.update_gateway(gateway_id, updated_gateway_dto)
    if success:
        return jsonify({'message': 'Gateway updated successfully'}), 200
    return jsonify({'message': 'Gateway not found'}), 404

@app.route('/gateways/<gateway_id>', methods=['DELETE'])
def delete_gateway(gateway_id):
    gateway_service.delete_gateway(gateway_id)
    return jsonify({'message': 'Gateway deleted successfully'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
