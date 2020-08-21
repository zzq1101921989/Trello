import React, { useEffect } from 'react';
import InitRouter from './routers';
import "./assets/css/css.css";
import Container from "./components/Container"
import { useLocation } from 'react-router-dom';

function App() {

  let {pathname} = useLocation();

  function isContainerRouter (pathname) {
    if (pathname == "/login" || pathname == "/register") {
      return true
    }
    return false
  }

  let res = isContainerRouter(pathname);

  return (
    <div className="App">
      {
        res ? 
        <InitRouter/> 
        : 
        <Container>
          <InitRouter/>
        </Container>
      }
    </div>
  );
}

export default App;
