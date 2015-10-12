import React from 'react';
import './_Login.scss';

let Login = ({user}) => {
   return (
    <div className="app-login">
      <div>{user}</div>
    </div>
  );
 };

 export default Login;
