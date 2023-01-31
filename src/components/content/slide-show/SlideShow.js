import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SlideShow.scss';

const SlideShow = ({ images, auto, showArrows }) => {
  const [state, setState] = useState({
    slideShow: images[0],
    slideIndex: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderInterval, setSliderInterval] = useState(0);

  const { slideShow, slideIndex } = state;
  let currentSlideIndex = 0;

  useEffect(() => {
    if (auto) {
      const timeInterval = setInterval(() => {
        autoMoveSlide();
      }, 5000);

      setSliderInterval(timeInterval);

      return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
      };
    }
  }, []);

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;

    setState((prev) => ({
      ...prev,
      slideShow: images[currentSlideIndex],
      slideIndex: currentSlideIndex,
    }));
  };

  const moveSlideWithArrows = (type) => {
    let index = currentIndex;

    if (type === 'prev') {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
    } else {
      if (currentIndex < images.length) {
        index += 1;
      }

      if (index === images.length) {
        index = 0;
      }
    }

    setCurrentIndex(index);
    setState((prev) => ({
      ...prev,
      slideShow: images[index],
      slideIndex: index,
    }));
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div
          className="slider-arrow slider-arrow--left"
          onClick={() => moveSlideWithArrows('prev')}
        />
        <div
          className="slider-arrow slider-arrow--right"
          onClick={() => moveSlideWithArrows('next')}
        />
      </div>
    );
  };

  const Indicators = ({ currentSlide }) => {
    const listIndicators = images.map((slide, index) => {
      const btnClasses =
        index === currentSlide
          ? 'slider-navButton slider-navButton--active'
          : 'slider-navButton';
      return <button key={index} className={btnClasses} />;
    });

    return <div className="slider-nav">{listIndicators}</div>;
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">
          {images && images.length && slideShow && (
            <div
              className="slider-image"
              style={{
                backgroundImage: `url(${slideShow.url})`,
                transition: 'background-image 0.5s linear',
              }}
            ></div>
          )}
        </div>
        <Indicators currentSlide={slideIndex} />
        {showArrows ? <RenderArrows /> : null}
      </div>
    </>
  );
};

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
  auto: PropTypes.bool.isRequired,
  showArrows: PropTypes.bool.isRequired,
  currentSlide: PropTypes.number,
};

export default SlideShow;
