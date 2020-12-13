import React from 'react';
import logo from '../../Images/logo.png';
import '../../css/Loading.css';

function Loading() {
  return (
    <div className='loading-wrapper'>
      <img className='loading' src={logo} alt='a bee landing on a honeycomb' />
    </div>
  )
}

export default Loading
