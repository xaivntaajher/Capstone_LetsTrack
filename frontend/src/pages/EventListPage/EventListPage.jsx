import React, { useState, useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import EventForm from '../../components/EventForm/EventForm';


const EventListPage = (props) => {



  return ( 
    <div>
      <EventForm />
      <h1>Events List</h1>
      <EventList  />
    </div>
  );
};

export default EventListPage;
