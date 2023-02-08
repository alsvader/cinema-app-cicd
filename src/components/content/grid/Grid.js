import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Rating from '../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';
import { IMAGE_URL } from '../../../services/movie.service';
import './Grid.scss';

const Grid = ({ list }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <>
      <div className="grid">
        {movieData.map((image) => (
          <LazyImage
            key={uuidv4()}
            className="grid-cell"
            src={`${IMAGE_URL}${image.poster_path}`}
            alt={image.title}
          >
            <div className="grid-read-more">
              <button className="grid-cell-button">Read More</button>
            </div>
            <div className="grid-detail">
              <span className="grid-detail-title">{image.title}</span>
              <div className="grid-detail-rating">
                <Rating rating={image.vote_average} totalStars={10} />
                &nbsp;&nbsp;
                <div className="grid-vote-average">{image.vote_average}</div>
              </div>
            </div>
          </LazyImage>
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
});

export default connect(mapStateToProps, {})(Grid);
