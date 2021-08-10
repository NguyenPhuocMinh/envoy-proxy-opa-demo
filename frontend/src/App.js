import { useState } from 'react';
import './App.css';
import { isEmpty } from 'lodash';

import { http } from './helpers';

function App() {

  const [messageUserPage, setMessageUserPage] = useState("");
  const [messageProduct, setMessageProductPage] = useState("");

  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJZbTlpIiwibmJmIjoxNTE0ODUxMTM5LCJleHAiOjE2NDEwODE1Mzl9.IwRIjAvPwV1IuUoDVc0elP9bUquErxLcpYVPMe0-qZU';
  const guestToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ3Vlc3QiLCJzdWIiOiJZV3hwWTJVPSIsIm5iZiI6MTUxNDg1MTEzOSwiZXhwIjoxNjQxMDgxNTM5fQ.VUsqwMR46q74tYu8DlzqfmcN9GXrPe5NtWsd0nf7N_o';

  const handleUserPage = () => {
    http.get('/user', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    })
      .then(({ data }) => {
        if (!isEmpty(data)) {
          setMessageUserPage(data.message);
        }
      })
  }

  const handleProductPage = () => {
    http.get('/product', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    })
      .then(({ data }) => {
        if (!isEmpty(data)) {
          setMessageProductPage(data.message)
        }
      })
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
        {messageProduct && <p>product page : {messageProduct}</p>}
      </header>
    </div>
  );
}

export default App;
