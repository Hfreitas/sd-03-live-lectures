import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';

import App from './App';
import renderWithRedux from './helpers/renderWithRedux';

describe('clients enrollment', () => {
  const renderAppWithRouter = (initialEntries = ['/']) => (
    <Router history={createMemoryHistory({ initialEntries })}>
      <App />
    </Router>
  );

  test('renders the initial page (Home)', () => {
    const { getByText } = renderWithRedux(
      renderAppWithRouter(),
      { initialState: { registerReducer: [], loginReducer: {} }},
    );

    const greetingText = getByText('Bem-vindo ao sistema de cadastramento!');
    expect(greetingText).toBeInTheDocument();
  });

  test('user login', () => {
    const { getByText, getByTestId } = renderWithRedux(
      renderAppWithRouter(),
      { initialState: { registerReducer: [], loginReducer: {} }},
    );

    fireEvent.click(getByText('Faça seu Login'));

    const inputEmail = getByTestId('input-email');
    const inputPassword = getByTestId('input-senha');
    const buttonLogin = getByTestId('btn-login');

    expect(inputEmail.value).toBe('');
    fireEvent.change(inputEmail, { target: { value: 'usuario001' } });
    expect(inputEmail.value).toBe('usuario001');

    expect(inputPassword.value).toBe('');
    fireEvent.change(inputPassword, { target: { value: '123456789' } });
    expect(inputPassword.value).toBe('123456789');

    fireEvent.click(buttonLogin);
    expect(getByText('Nenhum cliente cadastrado')).toBeInTheDocument();
  })

  test('when there are no clients, shows enrollment link', () => {
    const { getByText } = renderWithRedux(
      renderAppWithRouter(['/clients']),
      { initialState: { registerReducer: [], loginReducer: { email: 'usuario001', password: '1234' } }}
    );

    expect(getByText('Nenhum cliente cadastrado')).toBeInTheDocument();

    const buttonRegisterClient = getByText('Cadastre agora!');
    expect(buttonRegisterClient).toBeInTheDocument();

    fireEvent.click(buttonRegisterClient);
  });

  test('should register three users', () => {
    const { getByText, getByTestId } = renderWithRedux(
      renderAppWithRouter(['/register']),
      { initialState: { registerReducer: [], loginReducer: { email: 'usuario001', password: '1234' } }}
    );

    const givenUsers = [
      { name: 'Red', age: '11', email: 'kantochampion@pokemon.net' },
      { name: 'Ash', age: '10', email: 'ash@pokemon.net' },
      { name: 'Brock', age: '14', email: 'brock@pokemon.net' },
    ];

    const inputName = getByTestId('input-register-nome');
    const inputAge = getByTestId('input-register-idade');
    const inputEmail = getByTestId('input-register-email');

    givenUsers.forEach((givenUser) => {
      expect(inputName.value).toBe('');
      expect(inputAge.value).toBe('');
      expect(inputEmail.value).toBe('');

      fireEvent.change(inputName, { target: { value: givenUser.name }});
      expect(inputName.value).toBe(givenUser.name);

      fireEvent.change(inputAge, { target: { value: givenUser.age }});
      expect(inputAge.value).toBe(givenUser.age);

      fireEvent.change(inputEmail, { target: { value: givenUser.email }});
      expect(inputEmail.value).toBe(givenUser.email);

      fireEvent.click(getByText('Registrar Cliente'));
    });
  });

  test('enrolled clients should be able to be sorted by name', () => {
    const { getAllByTestId, getByText } = renderWithRedux(
      renderAppWithRouter(['/clients']),
      {
        initialState: {
          registerReducer: [
            { name: 'Red', age: '11', email: 'kantochampion@pokemon.net' },
            { name: 'Ash', age: '10', email: 'ash@pokemon.net' },
            { name: 'Brock', age: '14', email: 'brock@pokemon.net' },
          ],
        loginReducer: { email: 'usuario001', password: '1234' } }
      }
    );

    const clientNames = getAllByTestId('client-name');

    expect(clientNames[0].textContent).toBe('Nome: Red');
    expect(clientNames[1].textContent).toBe('Nome: Ash');
    expect(clientNames[2].textContent).toBe('Nome: Brock');

    const sortButton = getByText('Ordenar');

    fireEvent.click(sortButton);

    const sortedClients = getAllByTestId('client-name');
    expect(sortedClients[0].textContent).toBe('Nome: Ash');
    expect(sortedClients[1].textContent).toBe('Nome: Brock');
    expect(sortedClients[2].textContent).toBe('Nome: Red');

    fireEvent.click(sortButton);

    const unsortedClients = getAllByTestId('client-name');

    expect(unsortedClients[0].textContent).toBe('Nome: Red');
    expect(unsortedClients[1].textContent).toBe('Nome: Ash');
    expect(unsortedClients[2].textContent).toBe('Nome: Brock');
  });

  test('should remove a user after we click in delete button', () => {
    const { getByText, getByTestId, queryAllByTestId } = renderWithRedux(
      renderAppWithRouter(['/clients']),
      {
        initialState: {
          registerReducer: [
            { name: 'Red', age: '11', email: 'kantochampion@pokemon.net' },
            { name: 'Ash', age: '10', email: 'ash@pokemon.net' },
            { name: 'Brock', age: '14', email: 'brock@pokemon.net' },
          ],
          loginReducer: { email: 'usuario001', password: '1234' },
        },
      });

    let users = queryAllByTestId(/client-name/i);
    expect(users.length).toBe(3);

    const user1 = getByText('Nome: Red');
    const user2 = getByText('Nome: Ash');
    const user3 = getByText('Nome: Brock');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
    expect(user3).toBeInTheDocument();

    const deleteBrockButton = getByTestId(/button-remove-3/i);

    fireEvent.click(deleteBrockButton);

    users = queryAllByTestId(/client-name/i);

    expect(users.length).toBe(2);
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
    expect(user3).not.toBeInTheDocument();
  });
});
