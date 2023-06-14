import React, { useState, useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import axios from 'axios';

const EventListPage = () => {
  

  return ( 
    <div>
      <h1>Events List</h1>
      <EventList  />
    </div>
  );
};

export default EventListPage;
