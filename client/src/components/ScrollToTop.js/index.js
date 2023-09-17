import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('scrolling to top')
    window.scrollTo(0, 0);
  }, [pathname]);


  // useEffect(() => {
  //   console.log('Trying to scroll to top...');
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // }, [pathname]);


  return null;
}

export default ScrollToTop;