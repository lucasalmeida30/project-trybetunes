import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nome: '',
    loading: false,
  };

  componentDidMount() {
    this.nameLogin();
  }

  nameLogin = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState(({
      nome: user.name,
      loading: false,
    }));
  };

  render() {
    const { nome, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (
            <h3 data-testid="header-user-name">{ nome }</h3>
          )
        }
      </header>
    );
  }
}

export default Header;
