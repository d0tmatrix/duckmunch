let db = require('./utils/db');
let dayjs = require('dayjs');

function genFeeds (x, feed) {
  // always save dates in UTC time
  let start = dayjs(feed.date)
  let feeds = [Object.assign({}, feed, { date: start.format() })]
  // can you believe it, a for loop?!
  for (let i = 1; i <= x; i++) {
    feeds.push(Object.assign({}, feed, {
      date: start.add(i, 'days').format()
    }))
  }
  console.dir(feeds)
  return feeds
}

module.exports = async (req, res) => {
  console.dir(req.body)
  let response = {
    success: false,
    data: [],
    error: false,
    message: ''
  }
  let { repeatDays } = req.body
  // avoid sending this value to the DB
  delete req.body.repeatDays
  try {
    // always return an array with UTC formatted date
    let insertData = genFeeds(repeatDays, req.body)
    console.dir(insertData)
    let feeds = await db.feeds.insert(insertData)
    response.data = feeds
  } catch (error) {
    console.error(error)
    response = Object.assign(response, { error: true, message: error.message })
  } finally {
    res.json(response)
  }
}
