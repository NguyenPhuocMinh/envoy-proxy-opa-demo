import { useState } from 'react';
import './App.css';
import { isEmpty } from 'lodash';

import { http } from './helpers';

function App() {

  const baseURL = process.env.REACT_APP_REST_API_URL;
  console.log("🚀 ~ file: App.js ~ line 10 ~ App ~ baseURL", baseURL)

  const [messageUserPage, setMessageUserPage] = useState('');
  const [messageProduct, setMessageProductPage] = useState('');

  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJZbTlpIiwibmJmIjoxNTE0ODUxMTM5LCJleHAiOjE2NDEwODE1Mzl9.IwRIjAvPwV1IuUoDVc0elP9bUquErxLcpYVPMe0-qZU';
  const guestToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ3Vlc3QiLCJzdWIiOiJZV3hwWTJVPSIsIm5iZiI6MTUxNDg1MTEzOSwiZXhwIjoxNjQxMDgxNTM5fQ.VUsqwMR46q74tYu8DlzqfmcN9GXrPe5NtWsd0nf7N_o';

  const handleUserPage = async () => {
    const request = new Request(`${baseURL}/user`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${guestToken}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
      }),
    });
    fetch(request)
      .then(data => data.json())
      .then(result => {
        setMessageUserPage(result.message)
      })
  }

  const handleProductPage = () => {
    const request = new Request(`${baseURL}/product`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${guestToken}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
      }),
    });
    fetch(request)
      .then(data => data.json())
      .then(result => {
        setMessageProductPage(result.message)
      })
  }

  const handleClear = () => {
    setMessageUserPage('')
    setMessageProductPage('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleUserPage}>
          User Page
        </button>
        {messageUserPage && <p style={{ color: 'black' }}>User page : {messageUserPage}</p>}
        <br />
        <button onClick={handleProductPage}>
          Product Page
        </button>
        {messageProduct && <p style={{ color: 'black' }}>Product page : {messageProduct}</p>}
        <br />
        <button onClick={handleClear}>
          Clear
        </button>
      </header>
    </div>
  );
}

export default App;
