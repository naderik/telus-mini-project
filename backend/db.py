from configparser import ConfigParser
from sqlalchemy import create_engine, exc
import os

def read_config():
    '''
        Instantiating a config file reader for our use case.
        To be used to read credentials for connecting to PSQL
        DB hosted in GCP SQL.
    :return: ConfigParser
    '''

    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, '../config.ini')

    config = ConfigParser()
    config.read(file_path)

    return config

def connection_uri():
    '''
        Creating connection URI for connecting to PSQL DB. URI will
        be used to create SQLAlchemy engine for executing queries.
        :return: URI for our PSQL DB hosted in GCP SQL
    '''
    # config = read_config()

    # URI = 'postgresql+psycopg2://{}:{}@/{}?host={}'.format(
    #     config['history_database']['user'],
    #     config['history_database']['password'],
    #     config['history_database']['dbname'],
    #     config['history_database']['host']
    # )
    URI = "postgresql://postgres:postgres@35.226.141.139:5432/contract-data"

    return URI

def create_contracts_table(): 
    URI = connection_uri()
    my_connection = None
    TABLE_NAME = "contracts"

    CREATE_TABLE_QUERY = """
                    CREATE TABLE IF NOT EXISTS {} (
                        vndr_nm VARCHAR(120) NOT NULL,
                        vndr_num VARCHAR(120) NOT NULL,
                        agmnt_num VARCHAR(120) NOT NULL,
                        cntrct_stat_cd VARCHAR(120) NOT NULL,
                        cntrct_catgy_cd VARCHAR(120) NOT NULL,
                        cntrct_eff_dt VARCHAR(120) NOT NULL,
                        cntrct_expir_dt VARCHAR(120) NOT NULL,
                        id SERIAL PRIMARY KEY
                    )""".format(TABLE_NAME)
    
    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()
        my_connection.execute(CREATE_TABLE_QUERY)

        return "Table created successfully"

    except exc.SQLAlchemyError as error:
        return 'Error trying to create table: {}'.format(error)

    finally:
        my_connection.close()
        engine.dispose()

# def insert_contract(vndr_nm, vndr_num, agmnt_num, cntrct_stat_cd, cntrct_catgy_cd, cntrct_eff_dt, cntrct_expir_dt):
#     '''
#     Function used to insert our contract into the DB.
#     :param vndr_nm: Vendor name
#     :param vndr_num: Vendor number
#     :param agmnt_num: Agreement number
#     :param cntrct_stat_cd: Contract status code
#     :param cntrct_catgy_cd: Contract category code
#     :param cntrct_eff_dt: Contract effective date
#     :param cntrct_expir_dt: Contract expiration date
#     :return: error or success strings for inserting into DB.
#     '''
#     URI = connection_uri()
#     my_connection = None

#     try:
#         engine = create_engine(URI, echo=True)
#         my_connection = engine.connect()

#         my_connection.execute('INSERT INTO contracts VALUES (%s, %s, %s, %s,  %s, %s, %s, %s)', (vndr_nm, vndr_num, agmnt_num, cntrct_stat_cd, cntrct_catgy_cd, cntrct_eff_dt, cntrct_expir_dt, "DEFAULT"))
#         return "Insertion successful"

#     except exc.SQLAlchemyError as err:
#         return 'Error occured inserting into table {}. Exception: {}'.format("contracts", err)

#     finally:
#         my_connection.close()
#         engine.dispose()

def get_contracts():
    '''
    Function used to fetch all contracts from PSQL DB.
    :return: hashmap of contracts
    '''

    URI = connection_uri()
    my_connection = None
    
    GET_CONTRACTS_QUERY = """
                                SELECT * FROM contracts
                             """

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()

        contracts = my_connection.execute(GET_CONTRACTS_QUERY)

        all_contracts = {}

        i = 1
        for row in contracts:
            all_contracts[i] = (row['id'], row['vndr_nm'], row['vndr_num'], row['agmnt_num'], row['cntrct_stat_cd'], row['cntrct_catgy_cd'], row['cntrct_eff_dt'], row['cntrct_expir_dt'])
            i += 1

        return all_contracts

    except exc.SQLAlchemyError as err:
        return 'Error fetching from table {}. Exception: {}'.format("contracts", err)

    finally:
        my_connection.close()
        engine.dispose()


def delete_contract(id):
    '''
    Function used to delete contract fromDB, based on ID.
    :param id: first operand
    :return: string message on whether deleted successfully or not
    '''

    URI = connection_uri()
    my_connection = None

    try:
        engine = create_engine(URI, echo=False)
        my_connection = engine.connect()
        my_connection.execute('DELETE from contracts WHERE id = {}'.format(id))
        return "Deletion successful"
    except exc.SQLAlchemyError as err:
        return 'Error deleting data from table {}. Exception: {}'.format("contracts", err)

    finally:
        my_connection.close()
        engine.dispose()

if __name__=="__main__":
    delete_contract(999999999)