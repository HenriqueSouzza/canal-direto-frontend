import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Header from '../components/template/layout/header';
import Sidebar from '../components/template/layout/sidebar';
import Content from '../components/template/layout/content';
import Footer from '../components/template/layout/footer';

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
