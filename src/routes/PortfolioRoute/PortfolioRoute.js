import React, { Component, Fragment } from 'react';
import Gallery from '../../components/Gallery/Gallery';
import ProfileTop from '../../components/ProfileTop/ProfileTop';
import '../../css/Portfolio.css';

function Portfolio() {

  return (
    <div className='gallery-page-wrapper'>
      <ProfileTop />
      <Gallery />
    </div>
  );
};

export default Portfolio;