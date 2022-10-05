from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)

# Set up database cpnnection
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
db = SQLAlchemy(app)

# create the contact model

class Contract(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vndr_nm = db.Column(db.String(80), unique=True, nullable=False)
    vndr_num = db.Column(db.String(120), unique=True, nullable=False)
    agmnt_num = db.Column(db.String(120), unique=True, nullable=False)
    cntrct_stat_cd = db.Column(db.String(120), unique=True, nullable=False)
    cntrct_catgy_cd = db.Column(db.String(120), unique=True, nullable=False)
    cntrct_eff_dt = db.Column(db.String(120), unique=True, nullable=False)
    cntrct_expir_dt = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, vndr_nm, vndr_num, agmnt_num, cntrct_stat_cd, cntrct_catgy_cd, cntrct_eff_dt, cntrct_expir_dt):
        self.vndr_nm = vndr_nm
        self.vndr_num = vndr_num
        self.agmnt_num = agmnt_num
        self.cntrct_stat_cd = cntrct_stat_cd
        self.cntrct_catgy_cd = cntrct_catgy_cd
        self.cntrct_eff_dt = cntrct_eff_dt
        self.cntrct_expir_dt = cntrct_expir_dt

db.create_all()

# get single contract by id
@app.route('/contracts/<id>', methods=['GET'])
def get_contract(id):
    contract = Contract.query.get(id)
    del contract.__dict__['_sa_instance_state']
    return jsonify(contract.__dict__)

# get all contracts
@app.route('/contracts', methods=['GET'])
def get_contracts():
    contracts = Contract.query.all()
    return jsonify([e.serialize() for e in contracts])

# create a new contract
@app.route('/contracts', methods=['POST'])
def create_contract():
    data = request.get_json()
    new_contract = Contract(vndr_nm=data['vndr_nm'], vndr_num=data['vndr_num'], agmnt_num=data['agmnt_num'], cntrct_stat_cd=data['cntrct_stat_cd'], cntrct_catgy_cd=data['cntrct_catgy_cd'], cntrct_eff_dt=data['cntrct_eff_dt'], cntrct_expir_dt=data['cntrct_expir_dt'])
    db.session.add(new_contract)
    db.session.commit()
    return jsonify(new_contract.__dict__)

# update a contract
@app.route('/contracts/<id>', methods=['PUT'])
def update_contract(id):
    data = request.get_json()
    contract = Contract.query.get(id)
    contract.vndr_nm = data['vndr_nm']
    contract.vndr_num = data['vndr_num']
    contract.agmnt_num = data['agmnt_num']
    contract.cntrct_stat_cd = data['cntrct_stat_cd']
    contract.cntrct_catgy_cd = data['cntrct_catgy_cd']
    contract.cntrct_eff_dt = data['cntrct_eff_dt']
    contract.cntrct_expir_dt = data['cntrct_expir_dt']
    db.session.commit()
    return jsonify(contract.__dict__)

# delete a contract
@app.route('/contracts/<id>', methods=['DELETE'])
def delete_contract(id):
    contract = Contract.query.get(id)
    db.session.delete(contract)
    db.session.commit()
    return jsonify(contract.__dict__)


