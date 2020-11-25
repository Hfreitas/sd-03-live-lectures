from unittest.mock import patch, Mock

import pytest
import spider_quote
import requests


@patch("spider_quote.requests.get")
def test_fetch_content_should_return_text_from_url(mocked_get):
    content = """
    fake content
    """

    mocked_get.return_value.status_code = 200
    mocked_get.return_value.text = content
    assert spider_quote.fetch_content("http://somedomain.com") == content


@patch("spider_quote.requests.get")
def test_fetch_content_status_not_ok(mock_get):
    mock_get.return_value.status_code = 404
    mock_get.return_value.raise_for_status.side_effect = requests.HTTPError()
    response = spider_quote.fetch_content("http://somedomain.com")
    assert response == ""


@patch("spider_quote.requests.get")
def test_fetch_content_timeout_raised(mock_get):
    mock_get.side_effect = requests.ReadTimeout()
    response = spider_quote.fetch_content("http://somedomain.com")
    assert response == ""


def test_extract_quotes_should_retrieve_text():
    html_content = """
        <div class="quote" itemscope="" itemtype="http://schema.org/CreativeWork">
        <span class="text" itemprop="text">“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”</span>
        <span>by <small class="author" itemprop="author">Albert Einstein</small>
        <a href="/author/Albert-Einstein">(about)</a> - <a href="http://goodreads.com/author/show/9810.Albert_Einstein">(Goodreads page)</a>
        </span>
        <div class="tags">
            Tags:
            <meta class="keywords" itemprop="keywords" content="change,deep-thoughts,thinking,world">
            <a class="tag" href="/tag/change/page/1/">change</a>
            <a class="tag" href="/tag/deep-thoughts/page/1/">deep-thoughts</a>
            <a class="tag" href="/tag/thinking/page/1/">thinking</a>
            <a class="tag" href="/tag/world/page/1/">world</a>
        </div>
        </div>
        """
    expected_text = (
        "“The world as we have created it is a process of our"
        " thinking. It cannot be changed without changing our thinking.”"
    )

    quote = spider_quote.extract_quotes(html_content)[0]
    assert quote["text"] == expected_text


def test_extract_quotes_should_retrieve_author():
    html_content = """
        <div class="quote" itemscope="" itemtype="http://schema.org/CreativeWork">
        <span class="text" itemprop="text">“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”</span>
        <span>by <small class="author" itemprop="author">Albert Einstein</small>
        <a href="/author/Albert-Einstein">(about)</a> - <a href="http://goodreads.com/author/show/9810.Albert_Einstein">(Goodreads page)</a>
        </span>
        <div class="tags">
            Tags:
            <meta class="keywords" itemprop="keywords" content="change,deep-thoughts,thinking,world">
            <a class="tag" href="/tag/change/page/1/">change</a>
            <a class="tag" href="/tag/deep-thoughts/page/1/">deep-thoughts</a>
            <a class="tag" href="/tag/thinking/page/1/">thinking</a>
            <a class="tag" href="/tag/world/page/1/">world</a>
        </div>
        </div>
        """
    expected_author = "Albert Einstein"

    quote = spider_quote.extract_quotes(html_content)[0]
    assert quote["author"] == expected_author


def test_extract_quotes_should_retrieve_tags():
    html_content = """
        <div class="quote" itemscope="" itemtype="http://schema.org/CreativeWork">
        <span class="text" itemprop="text">“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”</span>
        <span>by <small class="author" itemprop="author">Albert Einstein</small>
        <a href="/author/Albert-Einstein">(about)</a> - <a href="http://goodreads.com/author/show/9810.Albert_Einstein">(Goodreads page)</a>
        </span>
        <div class="tags">
            Tags:
            <meta class="keywords" itemprop="keywords" content="change,deep-thoughts,thinking,world">
            <a class="tag" href="/tag/change/page/1/">change</a>
            <a class="tag" href="/tag/deep-thoughts/page/1/">deep-thoughts</a>
            <a class="tag" href="/tag/thinking/page/1/">thinking</a>
            <a class="tag" href="/tag/world/page/1/">world</a>
        </div>
        </div>
        """
    expected_tags = ["change", "deep-thoughts", "thinking", "world"]

    quote = spider_quote.extract_quotes(html_content)[0]
    assert quote["tags"] == expected_tags


@patch("spider_quote.requests.get")
def test_get_all_quotes_multiple_pages(mock_get):
    html_content = """
        <div class="quote" itemscope="" itemtype="http://schema.org/CreativeWork">
        <span class="text" itemprop="text">“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”</span>
        <span>by <small class="author" itemprop="author">Albert Einstein</small>
        <a href="/author/Albert-Einstein">(about)</a> - <a href="http://goodreads.com/author/show/9810.Albert_Einstein">(Goodreads page)</a>
        </span>
        <div class="tags">
            Tags:
            <meta class="keywords" itemprop="keywords" content="change,deep-thoughts,thinking,world">
            <a class="tag" href="/tag/change/page/1/">change</a>
            <a class="tag" href="/tag/deep-thoughts/page/1/">deep-thoughts</a>
            <a class="tag" href="/tag/thinking/page/1/">thinking</a>
            <a class="tag" href="/tag/world/page/1/">world</a>
        </div>
        </div>
        """
    pager = """
        <ul class="pager">
            <li class="next">
                <a href="/page/2/">Next <span aria-hidden="true">→</span></a>
            </li>
        </ul>
    """

    # A primeira página é construída com citações e paginação
    first_page = html_content + pager
    # Não há referência a próximas páginas na segunda página
    second_page = html_content

    mock_get.side_effect = [
        # Quando ocorrer a primeira requisição, retorne a primeira página
        Mock(status_code=200, text=first_page),
        # Na segunda chamada, retorne a segunda página
        Mock(status_code=200, text=second_page),
    ]

    # Como cada página tem 1 citação, asseguramos que 2 citações foram extraídas
    assert len(spider_quote.get_all_quotes()) == 2


def test_extract_author_should_retrieve_name():
    html_content = """
    <h3 class="author-title">J.K. Rowling</h3>
    <p><strong>Born:</strong> <span class="author-born-date">July 31, 1965</span> <span class="author-born-location">in Yate, South Gloucestershire, England, The United Kingdom</span></p>
    <div class="author-description">Author long description</div>
    """

    expected_author = "J.K. Rowling"
    author = spider_quote.extract_author(html_content)
    assert author["name"] == expected_author


def test_extract_author_should_retrieve_birth_date():
    html_content = """
    <h3 class="author-title">J.K. Rowling</h3>
    <p><strong>Born:</strong> <span class="author-born-date">July 31, 1965</span> <span class="author-born-location">in Yate, South Gloucestershire, England, The United Kingdom</span></p>
    <div class="author-description">Author long description</div>
    """

    expected_birth_date = "July 31, 1965"
    author = spider_quote.extract_author(html_content)
    assert author["birth-date"] == expected_birth_date


def test_extract_author_should_retrieve_birth_location():
    html_content = """
    <h3 class="author-title">J.K. Rowling</h3>
    <p><strong>Born:</strong> <span class="author-born-date">July 31, 1965</span> <span class="author-born-location">in Yate, South Gloucestershire, England, The United Kingdom</span></p>
    <div class="author-description">Author long description</div>
    """

    expected_birth_location = (
        "in Yate, South Gloucestershire, England, The United Kingdom"
    )
    author = spider_quote.extract_author(html_content)
    assert author["birth-location"] == expected_birth_location


def test_extract_author_should_retrieve_description():
    html_content = """
    <h3 class="author-title">J.K. Rowling</h3>
    <p><strong>Born:</strong> <span class="author-born-date">July 31, 1965</span> <span class="author-born-location">in Yate, South Gloucestershire, England, The United Kingdom</span></p>
    <div class="author-description">Author long description</div>
    """

    expected_description = "Author long description"
    author = spider_quote.extract_author(html_content)
    assert author["description"] == expected_description


@patch("spider_quote.requests.get")
def test_get_all_author_multiple_pages(mock_get):
    list_content = """
    <div class="quote" itemscope="" itemtype="http://schema.org/CreativeWork">
    <span>by <small class="author" itemprop="author">Albert Einstein</small>
        <a href="/author/Albert-Einstein">(about)</a> - <a href="http://goodreads.com/author/show/9810.Albert_Einstein">(Goodreads page)</a>
    </span>
    </div>
    """
    first_authors_page = """
    <h3 class="author-title">J.K. Rowling</h3>
    <p><strong>Born:</strong> <span class="author-born-date">July 31, 1965</span> <span class="author-born-location">in Yate, South Gloucestershire, England, The United Kingdom</span></p>
    <div class="author-description">Author long description</div>
    """
    second_authors_page = """
    <h3 class="author-title">Steve Martin</h3>
    <p><strong>Born:</strong> <span class="author-born-date">August 14, 1945</span> <span class="author-born-location">in Waco, Texas, The United States</span></p>
    <div class="author-description">Author long description</div>
    """
    pager = """
        <ul class="pager">
            <li class="next">
                <a href="/page/2/">Next <span aria-hidden="true">→</span></a>
            </li>
        </ul>
    """

    first_page = list_content + pager
    second_page = list_content

    mock_get.side_effect = [
        Mock(status_code=200, text=first_page),
        # Requisição feita para recuperar os detalhes de um autor
        # Temos somente 1 citação por página
        Mock(status_code=200, text=first_authors_page),
        Mock(status_code=200, text=second_page),
        Mock(status_code=200, text=second_authors_page),
    ]
    assert len(spider_quote.get_all_authors()) == 2
