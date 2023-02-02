import React from 'react';
import { Header, Tasks } from './components';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <div className="app">
      <div className="content">
        <Header />
        <Tasks />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
