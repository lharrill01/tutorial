import React, { Fragment } from 'react'

function EventForm( props ) {
  return (
    <Fragment>
        <form onSubmit={ props.onSubmit }>
            <div>
                <label htmlFor='email'>Your Email Address</label>
                <input type='email' id='email' ref={ props.emailRef }/>
            </div>
            <div>
                <label htmlFor='feedback'>Your Feedback</label>
                <textarea id='feedback' rows='5' ref={ props.feedbackRef }></textarea>
            </div>
            <button>Send Feedback</button>
        </form>
    </Fragment>
  )
}

export default EventForm;