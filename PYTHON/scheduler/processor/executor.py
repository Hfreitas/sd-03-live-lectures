from operator import itemgetter

processes = [
    {"pid": 1, "process_units": 15, "exit_code": 0,
        "result": 42, "mem_size": 15},
    {"pid": 2, "process_units": 5, "exit_code": 0, "result": 1, "mem_size": 5},
    {"pid": 3, "process_units": 10, "exit_code": 0, "result": 1, "mem_size": 5}
]
# A saída ([], []) é uma tupla contendo uma lista com resultados bons e uma
# #lista de resultados ruins.
# schedule(processes, decreased_units_per_cicle=5, mem_available=20)


def populate_memory(memory, processes):
    processes.sort(key=itemgetter("size"))
    while (
        processes
        and memory["available_size"] > 0
        and processes[0]["size"] <= memory["available_size"]
    ):
        process = processes.pop(0)
        memory["available_size"] -= process["size"]
        memory["running_processes"].append(process)


def probe_execution(process):
    execution_was_ok = process["exit_code"] == 0
    if execution_was_ok:
        return None
    raise OSError("Execution failed")


def schedule(processes, *, decreased_units_per_cicle, memory_available):
    breakpoint()
    good_output = []
    bad_output = []
    memory = {"running_processes": [], "available_size": memory_available}
    while processes or memory["running_processes"]:
        # populate memory
        populate_memory(memory, processes)
        # execute cicle
        for process in memory["running_processes"]:
            process["process_time"] -= decreased_units_per_cicle
            if process["process_time"] <= 0:
                try:
                    probe_execution(process)
                except OSError as exc:
                    bad_output.append(str(exc))
                else:
                    good_output.append(process["result"])
                finally:
                    memory["running_processes"].remove(process)
                    memory["available_size"] += process["size"]
    return good_output, bad_output
