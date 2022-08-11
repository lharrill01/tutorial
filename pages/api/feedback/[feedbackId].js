import React from 'react'
import { buildFeedbackPath, extractFeedback } from '.'


function handler( req, res) {
    if( req === 'DELETE '){

    }
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback( filePath );
    const selectFeedback = feedbackData.find(
        ( feedback ) => feedback.id === feedbackId
    );
    res.status( 200 ).json({ feedback: selectFeedback })

  return (
    <div>handler</div>
  )
}

export default handler