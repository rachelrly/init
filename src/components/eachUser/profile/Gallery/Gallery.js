
import React, { useState, useRef, useCallback, useEffect, Fragment, useContext } from 'react';
import GallerySearch from './GallerySearch';
import Post from '../../post/Post/Post';
import UserContext from '../../../../contexts/userContext';
import Loading from '../../../Loading/Loading';

export default function Gallery(props) {
  /*This component displays the paginated content for each user's profile*/

  const [observed, setObserver] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(2);

  //Here we destructure our useBookSearch
  const { results, hasMore, loading, error } = props.type === 'current' ? GallerySearch(observed, pageNumber, limit) : GallerySearch(observed, pageNumber, limit, props.id);


  const observer = useRef();

  const { isLoading, setLoading } = useContext(UserContext);

  if (isLoading && results.length) {
    console.log('this ran')
    setLoading(false)
  }


  const lastResultElementRef = useCallback(node => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {

        setPageNumber(prevPageNumber => prevPageNumber + 1);

        setObserver(!observed);
      }

    })

    if (node) observer.current.observe(node);

  }, [loading, hasMore]);

  useEffect(() => {


    return () => {
      setObserver(false)
      setPageNumber(1)

    }
  }, []);

  return (
    <Fragment>

      {isLoading
        ? <Loading />
        : <Fragment>
          <div className='gallery'>
            {results.map((project, index) => (results.length === index + 1)
              ? <div key={project.id} className='project-wrapper' ref={lastResultElementRef} ><Post {...project} /></div>
              : <div key={project.id} className='project-wrapper'><Post {...project} {...props.user} /> </div>
            )}

          </div>
          <p>{loading && 'Loading...'}</p>
        </Fragment>
      }
    </Fragment>
  );

};