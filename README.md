
You may need a CLIENT_ID, CLIENT_SECRET and REDIRECT_URL. 

-> Set in .env file

You can find these pieces of information by going to the Developer Console:

-> clicking your project --> APIs & auth --> credentials.

Navigate to the Cloud Console and Create a new OAuth2 Client Id

Select Web Application for the application type

Add an authorized redirect URI with the value http://localhost:3000/oauth2callback (or applicable value for your scenario)

Click Create, and Ok on the following screen