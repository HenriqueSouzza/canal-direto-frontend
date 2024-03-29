import React, { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';

import Header from '../template/logged/header';
import Sidebar from '../template/logged/sidebar';
import Content from '../template/logged/content';
import Footer from '../template/logged/footer';

function App() {

  //Correção do bug nos menus treeview
  //Não apagar esse código
  useEffect(() => {
    const trees = window.$('[data-widget="treeview"]');
    trees.Treeview('init');
  }, []);

  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
