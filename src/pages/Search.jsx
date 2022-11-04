import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artisti: '',
    isDisabled: true,
  };

  handleInput = (event) => {
    const { artisti } = this.state;
    this.setState(({
      artisti: event.target.value,
      isDisabled: artisti.length < 1,
    }));
  };

  render() {
    const { artisti, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          onChange={ this.handleInput }
          value={ artisti }
          type="text"
          placeholder="Nome do artista"
          data-testid="search-artist-input"
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isDisabled }
          // onClick={ bil }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
