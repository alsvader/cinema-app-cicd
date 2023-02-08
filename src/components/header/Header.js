import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  searchQuery,
  searchResult,
} from '../../redux/actions/movies';
import logo from '../../assets/cinema-logo.svg';
import './Header.scss';

const HEADER_LIST = [
  { id: 1, iconClass: 'fas fa-film', name: 'Now Playing', type: 'now_playing' },
  { id: 2, iconClass: 'fas fa-fire', name: 'Popular', type: 'popular' },
  { id: 3, iconClass: 'fas fa-star', name: 'Top Rated', type: 'top_rated' },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming',
  },
];

const Header = ({
  getMovies,
  setMovieType,
  setResponsePageNumber,
  page,
  totalPages,
  searchQuery,
  searchResult,
}) => {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now_playing');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getMovies(type, page);
    setResponsePageNumber(page, totalPages);
  }, [type]);

  const toggleMenu = () => {
    setMenuClass(!menuClass);
    setNavClass(!navClass);

    if (!navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  const setMovieTypeUrl = (type) => {
    setType(type);
    setMovieType(type);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    searchQuery(e.target.value);
    searchResult(e.target.value);
  };

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
            <img src={logo} alt="Logo" />
          </div>
          <div
            id="header-mobile-menu"
            className={`${
              menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'
            }`}
            onClick={() => toggleMenu()}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul
            className={`${
              navClass ? 'header-nav header-mobile-nav' : 'header-nav'
            }`}
          >
            {HEADER_LIST.map((item) => (
              <li
                key={item.id}
                className={
                  type === item.type
                    ? 'header-nav-item active-item'
                    : 'header-nav-item'
                }
                onClick={() => setMovieTypeUrl(item.type)}
              >
                <span className="header-list-name">
                  <i className={item.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name">{item.name}</span>
              </li>
            ))}
            <input
              className="search-input"
              type="text"
              placeholder="Search for a movie"
              value={search}
              onChange={onSearchChange}
            />
          </ul>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  getMovies: PropTypes.func.isRequired,
  setMovieType: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  searchQuery: PropTypes.func.isRequired,
  searchResult: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
});

export default connect(mapStateToProps, {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  searchQuery,
  searchResult,
})(Header);
