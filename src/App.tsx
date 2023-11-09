import { useEffect, useRef } from 'react';
import CommentsPage from './pages/CommentsPage';
import './App.scss';

const App = () => {
  const appContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    // Function for changing comment form styles based on scroll event
    const appContent = appContentRef.current;

    if (appContent) {
      const isScrolled = appContent.scrollTop > 0;
      const commentForm = document.querySelector('.js-comment-form');

      if (commentForm) {
        if (isScrolled) {
          commentForm.classList.add('scroll-active');
        } else {
          commentForm.classList.remove('scroll-active');
        }
      }
    }
  };

  useEffect(() => {
    handleScroll();
    const appContent = appContentRef.current;

    if (appContent) {
      appContent.addEventListener('scroll', handleScroll);
      return () => {
        appContent.removeEventListener('scroll', handleScroll);
      };
    }

    return undefined;
  }, []);

  return (
    <div className='app__container'>
      <div ref={appContentRef} className="app__content">
        <CommentsPage />
      </div>
    </div>
  );
}

export default App;
