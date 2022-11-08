import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isChecked: false,
    loading: false,
  };

  async componentDidMount() {
    const returnLocal = await this.getMusics();
    const { trackId } = this.props;
    const test = returnLocal.length > 0 && returnLocal.some((e) => e.trackId === trackId);
    this.setState({ isChecked: test, loading: false });
  }

  favoritesMusics = async ({ target }) => {
    const { checked } = target;
    const { isChecked } = this.state;
    this.setState({ isChecked: checked, loading: true });
    await addSong(this.props);
    this.setState({ loading: false });
    if (isChecked) {
      await removeSong(this.props);
    }
  };

  getMusics = async () => {
    this.setState({ loading: true });
    return getFavoriteSongs();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {
          loading ? <Loading />
            : (
              <label htmlFor="favorite">
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  checked={ isChecked }
                  onChange={ this.favoritesMusics }
                />
              </label>
            )
        }
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
