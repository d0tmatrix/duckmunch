const monk = require('monk')
const db = monk(process.env.MONGODB_URI)

const database = {
  feeds: db.get('feeds')
}

module.exports = database;
