import React, { useEffect, useState, useRef } from 'react'
import EventList from '../components/events/event-list';
import useSWR from 'swr';
import { getFeaturedEvents } from '../helpers/api-util';
import Head from 'next/head'
import EventForm from '../components/events/form';
import NewsletterRegistration from '../components/input/newsetter-registration';


function HomePage( props ) {

  const [ feedbackItems, setFeedbackItems ] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitHandler( event ){
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify( reqBody ),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(( response ) => response.json()) // { email: 'test@test.com}', text: 'Some feedback text' }
    .then(( data ) => console.log( data ));
  }

  function loadFeedbackHandler(){
    fetch('/api/feedback')
    .then(( response ) => response.json())
    .then(( data ) => setFeedbackItems( data.feedback ));
  }

  return (
    <div>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="Find a lot of great events that allow you to evolve."/>
        </Head>
        <NewsletterRegistration />
        <EventList items={ props.events } />
        <EventForm emailRef={ emailInputRef} feedbackRef={ feedbackInputRef} onSubmit={ submitHandler }/>
        <hr />
        <button onClick={ loadFeedbackHandler } >Load Feedback</button>
        <ul>
          { feedbackItems.map( item => <li key={ item.id }>{ item.text }</li>)}
        </ul>
    </div>
  )
}

export async function getStaticProps(){
  // const response = await fetch(  'https://nextjs-course-1c4e4-default-rtdb.firebaseio.com/events.json' )
  // const data = await response.json(); 

  const featuredEvents = await getFeaturedEvents();

  // const transformedEvents = [];

  //   for ( const key in data ){
  //     transformedEvents.push({
  //       id: key,
  //       title: data[key].title,
  //       description: data[key].description,
  //       location: data[key].location,
  //       date: data[key].date,
  //       image: data[key].image,
  //       isFeatured: data[key].isFeatured,
  //     })
  
  return{
    props: { events: featuredEvents },
    revalidate: 1800,
  }
}


export default HomePage

// hero section
// featured posts