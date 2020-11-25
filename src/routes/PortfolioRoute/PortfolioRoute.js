import React, { Component } from 'react';
import Gallery from '../../components/Gallery/Gallery';
import ProfileTop from '../../components/ProfileTop/ProfileTop';
import '../../css/Portfolio.css';

class Portfolio extends Component {
  render() {
    return (
      <section>
        <ProfileTop />
        <Gallery />
      </section>
    );
  };
};

export default Portfolio;