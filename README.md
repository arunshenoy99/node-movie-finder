# Movie Search App - MovieZ
## Movie information, user management, add movies to lists and share links to them.

### Config required
Modify `/config/dev.env` and add the following  
 **1. PORT** Used to override default value of 3000 for server port.  
 **2.MONGODB_URL** Connect to a mongodb database to store user and movie lists data.  
 **3.JWT_SECRET** Jwt is used as the authorization mechanism, specify the encoding and decoding secret for the JWT token.  
 **4.OMDB_API_KEY** To retrieve movie information from the OMDB API.  

### Starting the app
`npm init`
`npm run dev`
The above command runs the app in development mode which you might want to avoid when deploying it in production. Then make use of the next command specified here.  
`npm start`

### Hosted on Heroku
[movie-app](https://reddy-movie-app.herokuapp.com/)