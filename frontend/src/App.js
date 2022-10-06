
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState()

  useEffect(() => {
    fetch("http://localhost:8585/api/contracts", {
      method: 'GET',
      mode: 'cors'
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          setState(data)
        })
      }
    })
  }, [])
  console.log(state)
  //   if (response.status === 200) {
  //     (response.json()).then((data) => {
  //       setState({ contracts: data['contracts'] })
  //     })
  //   } else {
  //     (response.json()).then((data) => {
  //       setState({ answer: data['error'] })
  //       return null
  //     })
  //   }
  // }).catch((error) => {
  //   console.log("Error in fetching contracts", error)
  // })

  return (
    <>
      <h1>Telus Contracts App</h1>
      {state?.contracts?.map(d => <li>{d}</li>)}
    </>
  );
}

export default App;
