import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MainContent.scss';
import SlideShow from '../slide-show/SlideShow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';
import { IMAGE_URL } from '../../../services/movie.service';
import { getMovies } from '../../../redux/actions/movies';

const MainContent = ({ list, movieType, totalPages, page, getMovies }) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [images, setImages] = useState([]);

  const HEADER_TYPE = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming',
  };

  const randomMovies = list
    .sort(() => Math.random() - Math.random())
    .slice(0, 4);

  useEffect(() => {
    if (randomMovies.length) {
      const IMAGES = randomMovies.map((image, index) => ({
        id: index + 1,
        url: `${IMAGE_URL}${image.backdrop_path}`,
      }));

      setImages(IMAGES);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, totalPages]);

  const paginate = (type) => {
    if (type === 'prev' && currentPage > 1) {
      getMovies(movieType, currentPage - 1);
      setCurrentPage((prev) => prev - 1);
    } else {
      getMovies(movieType, currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="main-content">
      {/* Display slideshow */}
      <SlideShow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
      {/* Display grid component */}
      <Grid />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array.isRequired,
  movieType: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  getMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType,
  totalPages: state.movies.totalPages,
  page: state.movies.page,
});

export default connect(mapStateToProps, { getMovies })(MainContent);
