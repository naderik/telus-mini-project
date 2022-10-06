
import React, { useState, useEffect } from 'react';
import BasicTable from './components/BasicTable';
import LazyTable from './components/LazyTable';
import './App.css';

function App() {

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
      <LazyTable />
    </>
  );
}

export default App;
