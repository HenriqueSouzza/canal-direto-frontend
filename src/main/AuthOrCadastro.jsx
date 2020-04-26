import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Sidebar from '../components/template/layout/auth/sidebar';

import Content from '../components/template/layout/auth/content';

import './style.css';

function AuthOrCadastro() {

  return (
    <BrowserRouter>
      <div className="container-fluid bg-danger">
        <div className="row login-body">
          <Sidebar />
          <Content />
        </div>
      </div>
    </BrowserRouter >
  );

}

export default AuthOrCadastro;
