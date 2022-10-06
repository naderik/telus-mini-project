from flask import Flask, request, jsonify
from db import get_contracts, create_contracts_table

app = Flask(__name__)


@app.route('/')
def index():
    return jsonify({"message": "Hello, World!"})

# get single contract by id

# get all contracts


@app.route('/contracts', methods=['GET'])
def data():
    '''
    Function used to get all contracts from Postgres database and return to fetch call in frontend.
    :return: Json format of either collected calculations or error message
    '''

    all_contracts = []

    try:
        contracts = get_contracts()
        for key, value in contracts.items():
            all_contracts.append(value)

        return jsonify({'contracts': all_contracts}), 200
    except:
        return jsonify({'error': 'error fetching contracts'}), 500


# create a new contract

@app.route('/contracts', methods=['POST'])
def add_contract():
    '''
        Function used to insert a calculation into our postgres
        DB. Operands of operation received from frontend.
    :return: Json format of either success or failure response.
    '''

    add_contract = request.get_json()
    vndr_nm, vndr_num, agmnt_num, cntrct_stat_cd, cntrct_catgy_cd, cntrct_eff_dt, cntrct_expir_dt = add_contract['vndr_nm'], add_contract['vndr_num'], add_contract[
        'agmnt_num'], add_contract['cntrct_stat_cd'], add_contract['cntrct_catgy_cd'], add_contract['cntrct_eff_dt'], add_contract['cntrct_expir_dt']

    try:
        insert_contract(vndr_nm, vndr_num, agmnt_num, cntrct_stat_cd,
                        cntrct_catgy_cd, cntrct_eff_dt, cntrct_expir_dt)
        return jsonify({'Response': 'Successfully inserted into DB'}), 200
    except:
        return jsonify({'Response': 'Unable to insert into DB'}), 500

# update a contract

# delete a contract


if __name__ == '__main__':
    create_contracts_table()
    app.run(debug=True)
