import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musics: [],
  };

  componentDidMount() {
    this.apiMusics();
  }

  apiMusics = async () => {
    const { match: { params: { id } } } = this.props;
    console.log(this.props);
    const api = await getMusics(id);
    this.setState(({
      musics: api,
    }));
  };

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">

        <Header />
        <h3 data-testid="artist-name">
          { musics[0] && musics[0].artistName}
        </h3>
        <h4 data-testid="album-name">{ musics[0] && musics[0].collectionName}</h4>
        {
          musics.map((element, index) => (index > 0 && <MusicCard
            key={ element.artistId }
            artistName={ element.artistName }
            collectionName={ element.collectionName }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
          />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
