import pytest
from learning_tests.scenario2 import retrieve_stock_from_json
from unittest.mock import mock_open, patch
import json


def test_when_extension_was_incorrect_raises_an_exception():
    with pytest.raises(ValueError, match="Formato inválido"):
        # try:
        retrieve_stock_from_json("dummy")
        # except ValueError:
        # AssertionError: ...


def test_when_successful_it_must_return_stock_of_products(stock):
    with patch("builtins.open", mock_open(read_data=json.dumps(stock))):
        # arrange/act
        given = retrieve_stock_from_json("dontcare.json")
        # assert
        assert given == stock
    