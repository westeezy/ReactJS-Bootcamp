import React from 'react';
import AppActions from '../../actions/AppActions';
import './_Login.scss';


const Login = (props) => {
  const showForm = () => {
    AppActions.editUser({showForm: !props.user.editing});
  }

  const updateUserName = (e) => {
    AppActions.editUser({showForm: true, name: e.target.value});
  }

  const submitUser = (event) => {
    event.preventDefault();
    AppActions.changeUser();
  }

  return (<div className="app-login">
       {
          props.user.editing ?
            <form className="user-form" onSubmit={submitUser}>
              <input className="user-input" placeholder="UserName" onChange={updateUserName} />
            </form>
            : <span>{props.user.name}</span>
        }
        <a href="#" onClick={showForm}>
          <i className={props.user.editing ? 'fa fa-close' :  'fa fa-pencil'} />
        </a>
      </div>);
};

export default Login;
