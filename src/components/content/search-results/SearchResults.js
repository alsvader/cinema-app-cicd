import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Rating from '../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';
import { IMAGE_URL } from '../../../services/movie.service';
import '../grid/Grid.scss';
import './SearchResults.scss';

const SearchResults = ({ searchResult, searchQuery }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  return (
    <div className="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>{' '}
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map((image) => {
          return (
            image.poster_path && (
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
                    <div className="grid-vote-average">
                      {image.vote_average}
                    </div>
                  </div>
                </div>
              </LazyImage>
            )
          );
        })}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  searchResult: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  searchResult: state.movies.searchResult,
  searchQuery: state.movies.searchQuery,
});

export default connect(mapStateToProps, {})(SearchResults);
