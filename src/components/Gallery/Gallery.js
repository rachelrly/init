// Want to understand this better? try this video https://www.youtube.com/watch?v=NZKUirTtxcg

//useState is for allowing state to be used in Functional Components
//useRef allows for a value to persist after a render. A reference value, essentially
//useCallback works in conjunction with useRef to dynamically update the reference value at the end of our page
//We need to be updating our reference value and page to appropriately retrieve the right data for the infinite scroll 
import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import useBookSearch from './useBookSearch';
import GallerySearch from './GallerySearch';
import { Link } from 'react-router-dom'
import InitContentContext from '../../contexts/initContentContext'
import InitContentApiService from '../../services/init-content-api-service'
// import AvatarDefault from '../Footer/Images/avatar-default.png'
import { buffTo64 } from '../Utils/Utils'
import '../../css/AccountInformation.css'

export default function Gallery() {
  const [observed, setObserver] = useState(false);
  // const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(2);

  //Here we destructure our useBookSearch
  const { results, hasMore, loading, error } = GallerySearch(observed, pageNumber, limit);
  console.log('results?', results)

  //Observer starts off Null
  //It is a ref that tells us where we should be
  //Our useCallback will disconnect it, then it must be set up to observe what ever the node is
  const observer = useRef()
  //Okay...
  //The lastResultElementRef is a Reference Value which must be updated in conjunction with it's apperance on the page
  //So our reference value is equal to a function that takes care of that
  //*Our reference value appear far below, in the Return, right next to our Key
  //If the page is loading we shouldn't be return anything, so that is accounted for
  const lastResultElementRef = useCallback(node => {
    if (loading) return;
    //This is how we clear the observer
    if (observer.current) observer.current.disconnect();
    //This is how we we set the observer to follow our node
    //If you run this you will notice that the if statement is carried out once the pages intersects, or sees, the entry
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible');
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        setObserver(!observed);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  //Added a search bar to choose our Queries (actual app this is stretch goal)
  //Every query we want to default to Page 1. Starting off on Page 7 or so would be jarring
  // function handleSearch(e) {
  //   setQuery(e.target.value);
  //   setPageNumber(1);
  // }

  return (
    <>
      {!results.length
        ? null
        : <div>
          <div className='gallery'>
            {results.map((project, index) => {
              if (results.length === index + 1) {
                return <Link key={project.id} to={`/post/${project.id}`} className='img-container' ref={lastResultElementRef}>
                  <img
                    className='gallery-img'
                    alt={`project ${project.post_title}`}
                    src={`data:image/${project.post_image_type};base64,${buffTo64(project.post_image_file.data)}`}
                  />
                </Link>
              } else {
                return <Link key={project.id} to={`/post/${project.id}`} className='img-container'>
                  <img
                    className='gallery-img'
                    alt={`project ${project.post_title}`}
                    src={`data:image/${project.post_image_type};base64,${buffTo64(project.post_image_file.data)}`}
                  />
                </Link>

              }
            })}
          </div>
          <div>{loading && 'Loading...'}</div>
          <div>{error && 'Error'}</div>
        </div>
      }
    </>
  )


  // return (
  //   <>
  //     {/* <input type='text' value={query} onChange={handleSearch}></input> */}
  //     {/* We now map our results. They are all unique because of that Set thing we use in useresultsearch so the result can double as the Key */}
  {
    results.map((result, index) => {
      console.log('what a result', result)
      //Index + 1 is the final result that shows up, so it become our lastResult reference value
      //All the other results get rendered without needing to update the lastResultElementRef
      if (results.length === index + 1) {
        return <div className='returns' ref={lastResultElementRef} key={result}>{result}</div>
      } else {
        return <div className='returns' key={result}>{result}</div>
      }
    })
  }
  //     <div>{loading && 'Loading...'}</div>
  //     <div>{error && 'Error'}</div>
  //   </>
  // )
};