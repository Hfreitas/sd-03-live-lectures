from learning_tests.scenario1 import generate_simple_report
import pytest


def test_report_must_contain_older_manufacturing_date(stock):
    # arrange/act
    report = generate_simple_report(stock)
    # assert
    assert "Data de fabricação mais antiga: 2019-09-13" in report


def test_report_must_contain_closest_expiration_date(stock):
    # arrange/act
    report = generate_simple_report(stock)
    # assert
    assert "Data de validade mais próxima: 2023-01-17" in report


def test_must_contain_the_company_with_the_largest_quantity_of_products_stocked(stock):
    # arrange/act
    report = generate_simple_report(stock)
    # assert
    assert "Empresa com maior quantidade de produtos estocados: sanofi-aventis U.S. LLC" in report