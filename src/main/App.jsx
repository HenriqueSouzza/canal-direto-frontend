import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Header from '../template/logged/header';
import Sidebar from '../template/logged/sidebar';
import Content from '../template/logged/content';
import Footer from '../template/logged/footer';

function App() {

  return(
    <BrowserRouter >
      <div className="wrapper">
        <Header />
        <Sidebar />
        <Content />
        <Footer />
      </div>
    </BrowserRouter >    
  );
}

export default App;
