# B.I.N.D.
A social media managing &amp; marketing app for new businesses and social media influencers to help create and grow their brand. 

Users are able to:
- Get their social media profile info.
- Tweet
- View trending topics/hastags on IG/Twitter.
- Manage their calendar and events.

----

## Tech Used
- Node.JS
- ExpressJS (Web Server)
- Heroku (Web Hosting)
- MongoDB (Database)
- Mongoose (ORM)
- React 
- Redux
- MaterializeCSS (CSS Style Library)
- Passport (User Validation & API Authorization)
- Cheerio (Scraping)
- Full CalendarJS (Calendar Component)

## Getting Started
*To setup and run the application locally, follow these steps*
1. Clone the repo 
```
git clone https://github.com/ctracey92/bind.git
```

2. Navigate to the the directory you saved the repo to

3. Install dependencies 
``` 
npm install
```
4. Create a local instance of the MongoDB database
    - Modify the config file to be: mongoURI: process.env.MONGODB_URI || "mongodb://localhost/YOUR DB NAME"
5. Sign up for Twitter API and IG API access to gain the API keys/ 
6. Navigate to devcenter.heroku.com/articles/config-vars#accessing-config-var-values-from-code and follow the instructions to set up your ENV variables/
- Use the naming scheme below
``` 
TWITTER_CONSUMER_KEY 
TWITTER_CONSUMER_SECRET 
INSTAGRAM_CLIENT_ID 
INSTAGRAM_CLIENT_SECRET 
```

6. In the IG/Twitter components, API connect/twitter, and the config/twitter sections you will need to change the link to a new one to have the app work and not direct you back to my site. (a good starting point is your local host)

7. In your command line run npm start

8. From your browser, navigate to `localhost:3000`