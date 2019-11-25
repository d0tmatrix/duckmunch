let db = require('./utils/db');

module.exports = async (req, res) => {
  console.dir(req.body)
  let response = {
    success: false,
    data: [],
    error: false,
    message: ''
  }
  try {
    let feed = await db.feeds.insert(req.body)
    response.data = [feed]
  } catch (error) {
    console.error(error)
    response = Object.assign(response, { error: true, message: error.message })
  } finally {
    res.json(response)
  }
}
