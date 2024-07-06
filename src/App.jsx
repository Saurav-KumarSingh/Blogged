import React from 'react'

const App = () => {
  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <div>App with appwrite</div>
  )
}

export default App