module.exports = async (req, res) => {
  console.log('hit dashboard.js')
  let data = [{
    date: 'Monday November 25th 2019',
    amount: '2 cups',
    food: 'grain',
    type: 'oats',
    location: 'Moscow'
  }, {
    date: 'Monday November 25th 2019',
    amount: '2 cups',
    food: 'grain',
    type: 'oats',
    location: 'Moscow'
  }, {
    date: 'Monday November 25th 2019',
    amount: '2 cups',
    food: 'grain',
    type: 'oats',
    location: 'Moscow'
  }, {
    date: 'Monday November 25th 2019',
    amount: '2 cups',
    food: 'grain',
    type: 'oats',
    location: 'Moscow'
  }]
  res.json(data)
}
