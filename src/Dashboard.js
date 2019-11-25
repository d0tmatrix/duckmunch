import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function Dashboard() {
  const [feeds, updateFeeds] = useState([])
  const [error, setError] = useState(false)
  const [message, setErrorMessage] = useState('')
  useEffect(() => {
    (async () => {
      let serverResponse = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      if (!serverResponse.ok) {
        setError(true)
        setErrorMessage(serverResponse.status === 401 ? 'Unauthorized! 🤫' : (serverResponse.message || 'Internal server error, derp derp.'))
        return false
      }
      let feedsData = await serverResponse.json()
      updateFeeds(feedsData)
    })()
  }, [])
  return (
    <main className='dashboard'>
      <h1>Duck Munch Data</h1>
      {error ? (<p>Errrrrr: {message}</p>) : (
        <table>
          <thead>
            <tr>
              <th>Ducks</th>
              <th>Portion</th>
              <th>Food</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map(feed => (
              <tr>
                <td>{feed.numDucks}</td>
                <td>{feed.quantity} {feed.measure}</td>
                <td>{feed.type} ({feed.kind})</td>
                <td>{feed.location.address}</td>
                <td>{dayjs(feed.date).format()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Dashboard;
