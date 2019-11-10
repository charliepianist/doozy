import mysql.connector as mysql

class MySQL_DB(object):
    """
    This class builds a local mysql database connection.

    Attributes
    ----------
    user : string
        Name of the user to connect with
    host : string
        Name or IP address of the server host
    port : string
        TCP/IP port
    password : string
        The user's password.
    database : string
        MySQL database name.
    """
    def __init__(self, user, host, port, password, database, autocommit_bool):

        self.user = user
        self.host = host
        self.port = port
        self.password = password
        self.db_name = database
        self.autocommit_bool = autocommit_bool

        self.db = mysql.connect(
            host = self.host,
            user = self.user,
            passwd = self.password,
            database = self.db_name,
            port = self.port,
            autocommit=self.autocommit_bool)
