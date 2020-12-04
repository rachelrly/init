import React, { Component, Fragment } from 'react';
import GalleryAdjacent from '../../components/GalleryAdjacent/GalleryAdjacent';
import ProfileTop from '../../components/ProfileTop/ProfileTop';
import '../../css/Portfolio.css';

class PortfolioAdjacent extends Component {
  render() {
    return (
      <div className='gallery-page-wrapper'>
        <ProfileTop />
        <GalleryAdjacent />
      </div>
    );
  };
};

export default PortfolioAdjacent;