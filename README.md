## TEMPUS CODING CHALLENGE

Here is my take on the Tempus Coding challenge. While I didn't get a chance to fully complete the app, I did implement the majority of the requested features.

### Building and Running the app:
To build the app, navigate to the directory root and run: `npm run install:all`

To run the app, navigate to the directory root and run: `npm start`

No need to boot up a mongo database because the app uses Mongo Atlas in the cloud.

### Seeded Credentials:
##### Patient:
email: 'patient@test.com'
password: 'patient'
##### Doctor:
email: 'doctor@test.com'
password: 'doctor'

### The stack:
Frontend: React
Server: Node.js, Express.js
Database: MongoDB (Atlas)

## Features:
####  Implemented features:
- Users can sign in and out
- User login uses hashing and salting
- User sessions
- System recognizes if user is doctor or patient
- Doctors and patients can view their own information
- Doctors can view patient information

#### To be implemented:
- Users can change their info
- System restricts viewing and updating user info on the server side
- Server side security
- Redux state management

## App structure:

The app directory is structured by separating frontend and backend into client and server directories that are effectively isolated repositories. For production you would run a build script on the frontend to generate a dist folder which would be served by the backend.

```
/ client
  / public (assets not processed by webpack)
    - index.html (html entry file)
  / src (assets processed by webpack)
    / assets
    / components (react components)
      / pages (route specific components)
      / reusable (reusable components)
    / styles (global sass styles would go here)
    - app.js (react root component)
  - index.js (react mounting script)

/ server
  / src
    / routes (api route specific files)
      - index.js (combines separate routes into a single router)
    - app.js (node entry file)
    - database.js (mongoose setup)
    - seedDB.js (seeds user data)
  - config.js (env specific configs)
  - index.js (ESM entry to allow module imports)
```

While this structure isn't ideal it does the trick for this example. In an actual app I would take the api keys and other sensitive info and move them to git-ignored '.env' files that are loaded based on the current environment state (development, production, testing...).

## Philosophy and what I would do differently:

I decided to use [Create React App](https://github.com/facebook/create-react-app) to scaffold the client side. I chose this generator because it is simple, built and well maintained by facebook, and has a lot of documentation.

For frontend styling I mostly used [Material UI](https://material-ui.com/) since it seemed to be a quick and popular choice to make something reasonably attractive in the alloted time. I'm much more familiar with SASS/SCSS based styling but this was a good opportunity for me to explore the equally popular CSS in JS approach.

For React component structuring I mostly followed the new functional components/react hooks paradigm which is quite new to me but pretty powerful. It seems to be the direction React is moving so I'm glad I didn't use the legacy class structure for familiarity reasons.

For the backend I build it from scratch using a few key libraries such as [ExpressJS](https://expressjs.com/) and [PassportJS](http://www.passportjs.org/). These libraries abstract out a lot of the tedious boilerplate and functionality that I didn't want to implement myself. In particular I wanted to use an established hashing and salting system for password handling. Anyways for this challenge there is not much in place in terms of security such as auth middleware on the routes or session timeouts, but that could easily be added with more time and care.

For the database I used mongoose because it is a powerful and fairly simple to use noSQL database.For this example a relational database may be more suited for larger datasets especially if lots of disparate tables/collections need to be combined with joins. A GraphQL layer would also be very helpful in that circumstance.

## The fun stuff:

The background map flies to the addresses of the users you click! In reality the geolocation isn't tied to the address but rather each user has a random geolocation property, but with a geocoding api it could very easily be implemented.

Let me know what you think, and I hope you like it!
