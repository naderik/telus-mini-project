from flask import Flask, request, jsonify
from jinja2 import Undefined
from backend.db import get_contracts, create_contracts_table

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
    skip = request.args.get('skip', 0, type=int)
    take = request.args.get('take', 50000, type=int)
    all_contracts = []

    try:
        contracts = get_contracts(skip, take)
        for key, value in contracts.items():
            all_contracts.append(value)

        return jsonify({'data': all_contracts}), 200
    except:
        return jsonify({'error': 'error fetching contracts'}), 500


# create a new contract

# update a contract

# delete a contract


if __name__ == '__main__':
    create_contracts_table()
    app.run(debug=True)
