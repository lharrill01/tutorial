import React from 'react'
import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../helpers/db-util'



async function handler( req, res ) {
    if( req.method === 'POST'){
        const userEmail = req.body.email;

        if( !userEmail || !userEmail.includes( '@' )){
            res.status(422).json({ message: 'Invalid email address.'});
            return;
        }

        let client;

        try{
          client = await connectDatabase();
        }catch(error){
          res.status(500).json({ message: 'Connection to the database failed!'});
          return 0;
        }

        try{
          await insertDocument( client, { email: userEmail });
          client.close();
        }catch(error){
          res.status(500).json({ message: 'Insertion into the database failed!'});
          return 0;
        }


        res.status(201).json({ message: 'Signed up!'});
    }
  return (
    <div>handler</div>
  )
}

export default handler