import React from 'react';
import { Link } from 'react-router-dom';
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
            <div>
              <h3 data-testid="header-user-name">{ nome }</h3>
            </div>
          )
        }
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Musicas Favoritas
        </Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
