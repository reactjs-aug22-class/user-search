import './App.css'

import { useEffect, useState } from 'react'

import { v4 } from 'uuid'

function App() {
  const [users, setUsers] = useState([])
  const [results, setResults] = useState([])

  let searchTimer
  const handleSearchQuery = evt => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      const query = evt.target.value.toLowerCase()
      setResults(
        users.filter(
          (ele, index, arr) =>
            ele.first_name.toLowerCase().includes(query) ||
            ele.last_name.toLowerCase().includes(query)
        )
      )
    }, 500)
  }
  // fetch use data
  useEffect(() => {
    fetch('http://localhost:3000/data.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="App">
      <label htmlFor="search">Search </label>
      <input id="search" onChange={handleSearchQuery} />
      <hr />
      <ul>
        {results.map(ele => (
          <li key={v4()}>
            Name: {ele.first_name} {ele.last_name}
            Email: {ele.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
