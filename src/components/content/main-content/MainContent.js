import { useState } from 'react';
import './MainContent.scss';
import SlideShow from '../slide-show/SlideShow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const images = [
    {
      url: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 7.5,
    },
    {
      url: 'https://images.pexels.com/photos/3417667/pexels-photo-3417667.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 8.5,
    },
    {
      url: 'https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 7.8,
    },
    {
      url: 'https://images.pexels.com/photos/410734/pexels-photo-410734.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 9.7,
    },
    {
      url: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 6.5,
    },
    {
      url: 'https://images.pexels.com/photos/3417667/pexels-photo-3417667.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 8.5,
    },
    {
      url: 'https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 5.5,
    },
    {
      url: 'https://images.pexels.com/photos/410734/pexels-photo-410734.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 9,
    },
  ];

  const paginate = (type) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="main-content">
      {/* Display slideshow */}
      <SlideShow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now playing</div>
        <div className="paginate">
          <Paginate
            currentPage={currentPage}
            totalPages={10}
            paginate={paginate}
          />
        </div>
      </div>
      {/* Display grid component */}
      <Grid images={images} />
    </div>
  );
};

export default MainContent;
