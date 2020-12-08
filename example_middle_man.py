class DiskConfig:
    # ...
    def compute_access_time(self):
        print("access time")

    def list_system_partitions(self):
        print("list system partitions")

    def read_sata_properties(self):
        print("read sata properties")


disk_config = DiskConfig()
disk_config.compute_access_time()
disk_config.list_system_partitions()
disk_config.read_sata_properties()