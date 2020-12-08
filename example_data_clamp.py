class DatabaseConfig:

    def __init__(self, dialect, user, password, host, port, db_name):
        self.dialect = dialect
        self.user = user
        self.password = password
        self.host = host
        self.port = port
        self.db_name = db_name

    def uri(self):
        return f"{self.dialect}://{self.user}:{self.password}@{self.host}:{self.port}/{self.db_name}"

class Connection:
    # ...
    def get_pool(self, config):
        print(f"Connected to {config.uri()}")

    def add_pool(self, config):
        print(f"Add connection {config.uri()}")


config = DatabaseConfig('mysql', 'coxinha', 'coxinha1', 'coxinhalocal', '8081', 'coxinhaDB')
connection = Connection()
connection.get_pool(config)