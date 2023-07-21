import { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    const isVisible = scrolled > 300; // Define la posición en la que aparecerá el botón

    setIsVisible(isVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <KeyboardArrowUpIcon />
    </button>
  );
};

export default ScrollToTopButton;
