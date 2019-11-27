# Feed the Birds aka Duck Munch
#### Sample application for Freshwork Studios
**Submitted Nov 26th**
Delployed to: https://duckmunch.now.sh
Dashboard route: https://duckmunch.now.sh/dashboard
Auth: admin / feedtheduck5

### Running this app
---

Environment variables are confirgured in a `.env` file locally and via `now.json` in production.

###### .env

Follows usual syntax: `variableName=somesecret` and lives at project root.
These variables are available as `process.env.variableName` in api folder files after running `yarn startDev`.
For the front end to pick up vars in this file, they must start with `REACT_APP_` and be referenced as such in front end code. See the [create react app docs](https://create-react-app.dev/docs/adding-custom-environment-variables/)

###### now.json
Configuration for deployments at https://zeit.co, best when paired with the [now cli](https://zeit.co/docs)
Add secrets to your now account with `now secrets add <somesecret>`
If you've been given access to a team use `now switch <teamname>` to make use of the relevant secrets.

##### Workflows
- after cloning the repo, install dependencies by running `yarn` from this directory
- to work with the dev server and develop locally, you will also need the now cli tool. [Installation instructions](https://zeit.co/docs)
- Start local development: `yarn startDev` runs the app at http://localhost:3333
(you can change the port by updating the dev command and the proxy field, both in package.json)
- Deployment via zeit.co's cli tool: run `now` from the project root
- test: `yarn test`

### Approach
---

At the core, this project is a web form posting an array of objects to a back end for saving in a mongo database so it can be represented back to a scientist to consult for their Phd thesis. I decided on two routes only, one to render the form that collects the data needed to create the "feed" objects by posting to the back end and another to request that data and represent it in a table if correct credentials are provided. I used basic HTTP auth for the dashboard route so that the data wasn't available to anyone who happened on the url, but given that this is crowdsourced information, security at this level was not a large concern. HTTP Basic auth is considered secure enough when transmitted over https, though it's unconventional to login via a browser prompt. JWT or browser Cookies would be used in place of Basic auth if this application had more than one user who required authentication.

My intention was to create a form that was as simple and conversational as possible. I considered going the question by question route (like Typeform) but opted for something simpler that still represented the data being submitted in a conversational tone, reinforced by the low key nature of Paper.css. The data being submitted is essentially one sentence: how many ducks did you feed what, when and where? I strove to create a form that poses this question and makes it easy to answer (ie minimal navigation or reasoning required on the user's behalf).

Given there are only two routes, I bypassed installing `react-router-dom` and instead used a ternary operator to route based on `window.location`.

In choosing the stack, priority was given to familiarity. With only 10 hours, I couldn't spend time learning anything. As it is, I did reach for a library I'd never used (DayJs), however it's API is so like moment.js, that I know well, that this was not an issue.

### Stack
---

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


#### Component Overview
---
- **Index.js**
Application entry point, mounts React application on the DOM at #root.
Responsible for routing between App.js and Dashboard.js based on window.location.pathname and imports the stylesheets as to feed them through webpack.
  -  **App.js**
    Main application code. Renders a form that POSTS a feed data object to the server and an optional number of repeats to post the same feed pattern over the course of X days. For the grannies, mainly.
  - **Dashboard.js**
    View intended for the scientist to consult the data. Sends a GET request to the dashboard endpoint that responds with an auth challenge. Upon authentication, the complete array of feed objects are sent to the client to be represented in a simple table format.
  - /components
    - **Autocomplete** utilizes the Google maps API (called in via index.html script tag) to suggest locations as a user types.

#### Database model
---

The only model used in this application is the feed object representing one instance of a group of ducks being fed a quantity of food at a specific time and location. It has the following properties:

```
feed {
    _id: Mongo Object ID <primary key>
    numDucks: Int
    measure: MeasureType
    type: FoodType
    kind: String
    quantity: Int
    location: {
        lat: Float
        lng: Float
        address: String
    }
    date: DATETIME (ISO String in UTC time)
}

enum MeasureType {
    "Teaspoons"
    "Tablespoons"
    "1/4 cups"
    "1/2 cups"
    "full cups"
}

enum FoodType {
    "Grain"
    "Nuts"
    "Seeds"
    "Grubs / bugs"
    "Snacks"
    "Greens"
    "Other"
}
```
