
import React, { Fragment } from 'react'
import EventContent from '../../components/EventDetails/event-content';
import EventLogistics from '../../components/EventDetails/event-logistics';
import EventSummary from '../../components/EventDetails/event-summary';
import ErrorAlert from '../../components/ui/error-alert';
import { getFeaturedEvents, getEventById } from '../../helpers/api-util';
import Button from '../../components/ui/button'
import Head from 'next/head';
import Comments from '../../components/input/comments';

function EventDetailPage( props ) {


  const event = props.selectedEvent;

  if(!event){
    return (
      <Fragment>

        <div className='center'>
          <p>Loading</p>
        </div>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  return (
    <div>
        <Fragment>
          <Head>
            <title>{ event.title }</title>
            <meta name="description" content={ event.description }/>
          </Head>
          <EventSummary title={ event.title } />
          <EventLogistics date={ event.date } address={ event.location } image={ event.image } imageAlt={ event.title }/>
          <EventContent>
            <p>{ event.description }</p>
          </EventContent>
          <Comments eventId={ event.id }/>  
        </Fragment>
    </div>

  )
}

export async function getStaticProps( context ){
  
  const eventId = context.params.eventId;
  
  const event = await getEventById( eventId );

  return{
    props:{
      selectedEvent: event,
    },
    revalidate:30,
  }
}

export async function getStaticPaths(){

  const events = await getFeaturedEvents();

  const paths = events.map( event => ({ params: ({ eventId: event.id } )}))

  return{
    paths: paths,
    fallback: 'blocking',
  }
}

export default EventDetailPage