import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import routes from './config/routes';
import AppHeader from './components/Header/Header';

const App = () => {

    return (
        <div>
          <AppHeader/>
            <Router>
              <Routes>
                  {routes.map((route: any, index: number) => 
                      <Route
                          key={index}
                          path={route.path} 
                          Component={route.component}
                      />)}
              </Routes>
            </Router>
        </div>
    );
}

export default App;