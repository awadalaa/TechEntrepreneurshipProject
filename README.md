== TechEntrepreneurshipProject ==

# Idea: Crowdsource Fashion Advice App 

This is a barebones Node.js app using the mean stack:
[MongoDB](http://www.mongodb.org/)
[Express 4](http://expressjs.com/)
[AngularJS](https://angularjs.org/)
[NodeJS](http://nodejs.org/)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
git clone https://github.com/awadalaa/TechEntrepreneurshipProject.git # or clone your own fork
cd TechEntrepreneurshipProject/api-server/
npm install
npm start
```

Your app should now be running on [localhost:1337](http://localhost:1337/).

# Authentication uses Oauth Bearer tokens
* get a token from http://localhost:1337/oauth/token
* curl http://localhost:1337/oauth/token --data "grant_type=password&client_id=YOURCLIENTID&client_secret=CLIENT_SECRET&username=USERNAME&password=PASSWORD"
* use the Bearer access_token to make requests



## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using this experimental
web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
