import './MainContent.scss';
import SlideShow from '../slide-show/SlideShow';

const MainContent = () => {
  const images = [
    {
      url: 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      url: 'https://images.pexels.com/photos/3417667/pexels-photo-3417667.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      url: 'https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
    {
      url: 'https://images.pexels.com/photos/410734/pexels-photo-410734.jpeg?auto=compress&cs=tinysrgb&w=500',
    },
  ];

  return (
    <div className="main-content">
      {/* Display slideshow */}
      <SlideShow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now playing</div>
        <div className="paginate">Paginate</div>
      </div>
      {/* Display grid component */}
    </div>
  );
};

export default MainContent;
