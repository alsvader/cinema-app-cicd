import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/Spinner';
import SearchResults from '../content/search-results/SearchResults';
import {
  loadMoreMovies,
  setResponsePageNumber,
} from '../../redux/actions/movies';
import './Main.scss';

const Main = ({
  list,
  loadMoreMovies,
  page,
  totalPages,
  setResponsePageNumber,
  movieType,
  searchResult,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      console.log('nuevo fetch', currentPage);
      setResponsePageNumber(currentPage, totalPages);
      loadMoreMovies(movieType, currentPage);
    }
  }, [currentPage]);

  const fetchData = () => {
    if (page < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } =
      bottomLineRef.current.getBoundingClientRect();

    if (bottomLineTop <= containerHeight) {
      // fetch data
      fetchData();
    }
  };

  return (
    <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {searchResult && searchResult.length === 0 ? (
            <MainContent />
          ) : (
            <SearchResults />
          )}
        </>
      )}
      <div ref={bottomLineRef}></div>
    </div>
  );
};

Main.propTypes = {
  list: PropTypes.array.isRequired,
  loadMoreMovies: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
  movieType: PropTypes.string.isRequired,
  searchResult: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  searchResult: state.movies.searchResult,
});

export default connect(mapStateToProps, {
  loadMoreMovies,
  setResponsePageNumber,
})(Main);
