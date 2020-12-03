import React, { Component } from 'react';
import ActivityList from '../../components/ActivitiesList/ActivityList'
import '../../css/FollowList.css';

class Buzz extends Component {
    render() {
        return (<div className='buzz-container'>
            <ActivityList />
            </div>
        );
    };
};

export default Buzz;