# Feed the Birds aka Duck Munch
#### Sample application for Freshwork Studios
**Submitted Nov 26th**
Delployed to: https://duckmunch.now.sh
Dashboard route: https://duckmunch.now.sh/dashboard
Auth: admin / feedtheduck5

### Running this app

Environment variables are confirgured in a `.env` file locally and via `now.json` in production. 

###### .env 

Follows usual syntax: `variableName=somesecret` and lives at project root.
These variables are available as `process.env.variableName` in api folder files after running `yarn startDev`.
For the front end to pick up vars in this file, they must start with `REACT_APP_variableName` and be referenced as such in front end code.

###### now.json 
Configuration for deployments at https://zeit.co, best when paired with the now cli.
Add secrets to your now account with `now secrets add <somesecret>`
If you've been given access to a team `now switch <teamname>`

#### Commands
- after cloning the repo, install dependencies by running `yarn` from this directory
- Start local development: `yarn startDev` runs the app at http://localhost:3333
(you can change the port by updating the dev command and the proxy field, both from package.json)
- Deployment to zeit.co: `now`
- test: `yarn test`

# Tech Overview

**Approach**

At the core, this project is a web form. A user wants to visit the web app and submit some data. This data is saved and can be represented back to the scientist to consult. I decided on two routes only, one to represent the form and issue a post request to the back end to save "feeds" and another to request that data and represent it in a table. I used basic HTTP auth for the dashboard route so that the data wasn't available to anyone who happened on the url, but given that this is crowdsourced information, security at this level was not a large concern. 

My intention was to create a form that was as simple and conversational as possible. I considered going the question by question route (like Typeform) but opted for something simpler that still represented the data being submitted in a conversation tone, reinforced by the low key nature of Paper.css. The data being submitted is essentially one sentence: how many ducks did you feed what, when and where? I strove to create a form that essentially poses this question and makes it easy to answer. 

Given there are only two routes, I bypassed installing `react-router-dom` and instead used basic ternary operator routing based on `window.location`. Any more routes or authentication schemes and I would install a router right away.

At the fore was familiarity in chosing the stack. With only 10 hours, I couldn't spend time learning anything, as it is, I did reach for a library I'd never used (DayJs), however it's API is so like moment which I know well this was not an issue.

**Database**: MongoDb running at mlab

  - Free and very fast to set up
  - Familiar
  - Great for prototyping as mongo is schema-less
  - Monk (mongo driver)
    - familiar
    - works with promises
    - straightforward docs
 
**Front end** : Create React App

- familiar
- efficient development experience
- fun to use
- maintainable, in that most people are familiar with it as well
- easy to find help online if needed
- **Paper.css**
    - always wanted to use this framework cuz it's cute
    - straightforward, class based, small bundle footprint compared to more thorough options that were considered (antd, blueprint). The other contender was [nes.css](https://nostalgic-css.github.io/NES.css/) 🕹️
- **DayJS**
  - JS library for dealing with dates, tiny bundle footprint as compared to moment
  - originally intended to use native `Date() constructor` but that turned in to a nightmare as per usual 🙀

**Deployment**: Zeit.co

- most seamless deployment workflow imaginable, just run `now` and get an https url
- encourages best practices with regards environment variables, keeping things lean and enforcing https on production
- API folder structure great for rapid prototyping
- free!
- encourages modular thinking, all back end routes are independent microservices
- release of `now dev` (dev server) makes developing for now locally a dream, the local environment is almost exactly like the production environment (env vars being one exception)
- allows devs to focus on development and less on ops