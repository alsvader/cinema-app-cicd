import { useState, useEffect, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import './Rating.scss';

const Rating = ({ rating, totalStars, className }) => {
  const [numberOfStars, setNumberOfStars] = useState([]);
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map((i) => i + 1));

    let percentage;

    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }

    const starPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = starPercentage;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {numberOfStars.map((i) => (
          <Fragment key={`back-star-${i}`}>
            <i className="fas fa-star" aria-hidden="true"></i>
          </Fragment>
        ))}

        <div className={`front-stars ${className}`} ref={ratingRef}>
          {numberOfStars.map((i) => (
            <Fragment key={`front-star-${i}`}>
              <i className="fas fa-star" aria-hidden="true"></i>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Rating;
