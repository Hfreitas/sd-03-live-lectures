from processor.executor import populate_memory, probe_execution, schedule
import pytest


def test_populate_memory_with_fitable_process_put_it_on_running_processes():
    memory = {"running_processes": [], "available_size": 20}
    process_1 = {
        "pid": 1,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 15,
    }
    processes = [process_1]
    expected_memory = [process_1]
    populate_memory(memory, processes)
    assert memory["running_processes"] == expected_memory


def test_populate_memory_with_fitable_process_decrease_available_size():
    memory = {"running_processes": [], "available_size": 20}
    process_1 = {
        "pid": 1,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 15,
    }
    processes = [process_1]
    populate_memory(memory, processes)
    assert memory["available_size"] == 5


def test_populate_memory_with_fitable_multiple_process_put_all_on_running():
    memory = {"running_processes": [], "available_size": 20}
    process_1 = {
        "pid": 1,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 5,
    }
    process_2 = {
        "pid": 2,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 5,
    }
    processes = [process_1, process_2]
    expected_running_processes = [process_1, process_2]
    populate_memory(memory, processes)
    assert memory["running_processes"] == expected_running_processes


def test_populate_memory_given_priority_for_minor_process():
    memory = {"running_processes": [], "available_size": 20}
    process_1 = {
        "pid": 1,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 15,
    }
    process_2 = {
        "pid": 2,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 5,
    }
    process_3 = {
        "pid": 3,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 5,
    }
    processes = [process_1, process_2, process_3]
    expected_running_processes = [process_2, process_3]
    populate_memory(memory, processes)
    assert memory["running_processes"] == expected_running_processes


def test_probe_execution_finished_with_success():
    process = {
        "pid": 1,
        "process_time": 0,
        "exit_code": 0,
        "result": 42,
        "size": 15
    }
    assert probe_execution(process) is None


def test_probe_execution_with_error_raises_exception():
    process = {
        "pid": 1, "process_time": 0, "exit_code": 1, "result": 42, "size": 15}
    with pytest.raises(OSError):
        probe_execution(process)


def test_schedule_zero_process_returns_nothing():
    processes = []
    assert schedule(
        processes, decreased_units_per_cicle=5, memory_available=20
    ) == ([], [],)


def test_schedule_unique_process_with_success():
    process = {
        "pid": 1,
        "process_time": 10,
        "exit_code": 0,
        "result": 42,
        "size": 10,
    }
    processes = [process]
    expected_success = [42]
    expected_errors = []
    assert schedule(
        processes, decreased_units_per_cicle=5, memory_available=20
    ) == (expected_success, expected_errors)


def test_schedule_unique_process_with_error():
    process = {
        "pid": 1,
        "process_time": 10,
        "exit_code": 1,
        "result": 42,
        "size": 10,
    }
    processes = [process]
    expected_success = []
    expected_errors = ["Execution failed"]
    assert schedule(
        processes, decreased_units_per_cicle=5, memory_available=20
    ) == (expected_success, expected_errors)
