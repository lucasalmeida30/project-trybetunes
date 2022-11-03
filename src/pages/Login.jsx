import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const NUMBER = 2;

class Login extends React.Component {
  state = {
    inputNome: '',
    isButtonDisabled: true,
    loading: true,
  };

  onChangeInput = (event) => {
    const { inputNome } = this.state;
    this.setState(({
      inputNome: event.target.value,
      isButtonDisabled: inputNome.length < NUMBER,
    }));
  };

  handleClick = async () => {
    const { inputNome } = this.state;
    const { history } = this.props;
    this.setState(({
      loading: false,
    }));
    await createUser({ name: inputNome });
    history.push('/search');
  };

  render() {
    const { inputNome, isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? (
          <>
            <label htmlFor="nome">
              Login
              <input
                onChange={ this.onChangeInput }
                value={ inputNome }
                type="text"
                data-testid="login-name-input"
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>

          </>
        ) : <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
