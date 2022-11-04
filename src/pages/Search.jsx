import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    artisti: '',
    isDisabled: true,
    inputButtonDisabled: false,
    album: [],
    searchName: '',
    searchAlbum: false,
  };

  handleInput = (event) => {
    const { artisti } = this.state;
    this.setState(({
      artisti: event.target.value,
      isDisabled: artisti.length < 1,
      searchName: event.target.value,
    }));
  };

  searchAlbum = async (event) => {
    event.preventDefault();
    const { artisti } = this.state;
    this.setState(({
      inputButtonDisabled: true,
    }));
    const album = await searchAlbumsAPI(artisti);
    this.setState(({
      artisti: '',
      inputButtonDisabled: false,
      album,
      searchAlbum: album.length === 0,
    }));
  };

  render() {
    const { artisti, isDisabled, inputButtonDisabled,
      album, searchName, searchAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          inputButtonDisabled ? <Loading /> : (
            <form>
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
                onClick={ this.searchAlbum }
              >
                Pesquisar
              </button>
              <h2>
                { `Resultado de álbuns de: ${searchName}`}
              </h2>
              {
                searchAlbum && <h2>Nenhum álbum foi encontrado</h2>
              }
            </form>
          )
        }
        {
          album.map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
            <div key={ collectionName }>
              <h3>{artistName}</h3>
              <img src={ artworkUrl100 } alt={ artistName } />
              <p>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `album/${collectionId}` }
                >
                  { collectionName }
                </Link>
              </p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Search;
