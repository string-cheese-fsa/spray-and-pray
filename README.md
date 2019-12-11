# Spray-R Overview

Spray-R is an augmented reality (AR) graffiti mobile application that allows users to draw in 3D space and share their drawings with others. It is built by a team of 4: Colin Kim, Edward Lu, David Sanvicente, and Alvin Togonon. We were motivated by our desire to join the worlds of emerging AR technologies and urban artistic expression, putting a 21st century spin on street art and modernizing it. Our app works by mapping AR planes to real life surfaces that act as virtual canvases, which can then be drawn on using the motion of a phone. Some more interesting features include the ability to save and share your art as a geo-cached object. This plays on the idea of “turfs” within the graffiti subculture. Users local to an area will have their art pieces associated with one another, encouraging engagement and competition.

#Tech Stack
The front-end is built using React Native which helped us rapidly build a mobile application in Javascript. The ViroReact library was used to render AR components, and it also bundled well with React Native. On the backend we used a PostgreSQL database to store information about each graffiti object, and Express.js to write routes and handle requests. Finally, we deployed our server side code using Heroku.

#Instructions to test our app
1. Download the Viro app on the app store.
2. `npm install` and `npm start`
3. Open the Viro app test environment, and enter the ngrok address provided when you run `npm start`
4. Start the app and enjoy creating!
