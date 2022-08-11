import React from 'react'
import EventItem from './event-item';
import classes from './event-list.module.css'

function EventList(props) {
    const { items } = props;
  return (
    <div>
        <ul className={ classes.list }>
            { items.map( event  =>
                <EventItem key={ event.id } title={ event.title } date={ event.date } image={ event.image } location={ event.location } id={ event.id } />
            ) }
        </ul>
    </div>
  )
}

export default EventList