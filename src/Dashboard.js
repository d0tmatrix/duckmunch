import React, { useState, useEffect } from 'react';
import './App.css';

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
        setErrorMessage(serverResponse.message || 'Internal server error, derp derp.')
        return false
      }
      let feedsData = await serverResponse.json()
      updateFeeds(feedsData)
    })()
  }, [])
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <p>
          Edit <code>src/Dashboard.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dashboard
        </a>
        {error ? (<p>Hit an error! {message}</p>) : feeds.map(feed => (<li>{feed.date}</li>))}
      </header>
    </div>
  );
}

export default Dashboard;
