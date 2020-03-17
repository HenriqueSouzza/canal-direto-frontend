import React from 'react';

import { HashRouter } from 'react-router-dom';

import Header from '../components/template/layout/header';
import Sidebar from '../components/template/layout/sidebar';
import Content from '../components/template/layout/content';
import Footer from '../components/template/layout/footer';

function App() {
  return(
    <HashRouter>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <Content />
        <Footer />
      </div>
    </HashRouter>    
  );
}

export default App;
