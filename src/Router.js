import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Nav } from './Nav';
import { Admin } from './Admin';
import { Main } from './Main';
import { Profile } from './Profile';

export const Router = () => {

  // TODO double check this
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route exact path='/' component={Main} />
        <Route path='/admin' component={Admin} />
        <Route path='/profile' component={Profile} />
        <Route component={Main} />
      </Routes>
    </HashRouter>
  );
};