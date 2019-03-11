# News-Scraper
News Scraper for UA Code Boot Camp Using MongoDB, Mongoose, and Cheerio

## Table of Contents
- [Summary](#summary)
- [How It Works](#how-it-works)
    - [Express, Axios, and Mongoose](#express-axios-and-mongoose)
    - [Express (Again) and Handlebars](#express-again-and-handlebars)
- [Live Build](#live-build)

## Summary
For a coding boot camp exercise, we were tasked with building a full-stack web application that relied on virtual databases and filling it with information via web scraping. The virtual server would be deployed and sustained on [Heroku](https://www.heroku.com/), and the scraping feature would be developed using various pieces of technology.

The final product had to be a one-page website that could display all our scraped data, and allow users who visit the page to leave comments on any of the articles created via the scraping process.

## How It Works
The full-stack application is made up of a front end and back end, and each end uses multiple parts and technologies to work.

The back end is arguably the most important part, as it includes the database that our application is built around. To build our virtual server and line it with information, we utilized [Node.JS](https://www.nodejs.org/) and the package manager it uses, [NPM](https://www.npmjs.com/), to create our application.

The packages that we needed for this to work include:
- [Express](https://www.npmjs.com/package/express) - a JavaScript web framework that lets us set up routes for our data
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - a package that connects Express to our front end's template engine
- [Axios](https://www.npmjs.com/package/axios) - an HTTP client for making AJAX calls via JavaScript
- [Cheerio](https://www.npmjs.com/package/cheerio) - a package giving us a striped-down core version of jQuery
- [Mongoose](https://www.npmjs.com/package/mongoose) - a package for creating MongoDB data models

### Express, Axios, and Mongoose
Our server JavaScript file starts by setting up our [Express](https://www.expressjs.com/) application, so we can create the framework for our data to work around. This includes setting up routes from our back end -- the virtual server -- to the front end -- the one-page website.

The first big route we need to set up is the one that we use to perform a web scrape. This is when a piece of JavaScript seeks out information through specific code, and returns said information. For this, we use two of our packages: Cheerio and Axios. The Cheerio package gives us some of the core features available in a large library like [jQuery](https://www.jquery.com/), which we can use with Axios to perform our web scrape.

Although we have a route for getting this data, we still need to store it, and that's where Mongoose comes in. Mongoose is a package that allows us to perform [MongoDB](https://www.mongodb.com/) functions and queries. This includes taking all the data that our scrape route produces, and stores it in our virtual server. Mongoose also allows us to create data models to better organize our data. In the case of our application, we have an article model -- which create article entries using the articles our scrape produces -- and a comment model -- which formats our user comments for storage in the database. Our models also allow us to connect specific comments to specific articles, for future use.

### Express (Again) and Handlebars
Even though we have a virtual server and data models, we still need to set it up so that we can visually see this data without having to use some kind of workbench software. For this, we need to set up our applications front end.

Because our application is going to be 'dynamic' and always changing with the data we get from our server, it doesn't make any sense to use plain, static HTML pages. Instead, we're going to use a template engine that adapts the static content of our page using JavaScript. The engine for our project is [Handlebars](https://handlebarsjs.com/), and it allows us to write some 'core' pieces of HTML while using code blocks to dynamically insert our data.

Once we're sure that our Express routes are properly set up, we can utilize the Express-Handlebars package to connect our Express application's routes to parts of the Handlebars template. This is how we're able to populate the index page of our app with all the articles that are stored in our virtual server's database. Any time we want to update our database with freshly-scraped articles, there's a button at the top of the app that lets us update the listings.

In addition to pulling articles from our server, we have JavaScript written that will update a modal with the comments that each article has. However, rather than using iteration to get those comments (like we did with the articles), our JavaScript will clear the model and re-populate it with comments for the article that is clicked on. Getting and creating those comments are taken care of by the GET and POST routes that we set up, earlier, with Express.

## Live Build
The final, live version of this application can be found [here](https://ua-news-scraper.herokuapp.com/), and is hosted courtesy of Heroku.

In addition to using Heroku for hosing the application, we used a special add-on called [mLab MongoDB](https://www.mlab.com/) to help set up and maintain our database.