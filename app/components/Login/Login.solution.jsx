import React from 'react';
import UserStore from '../../stores/UserStore';
import { changeUser } from '../../actions/AppActions';
import './_Login.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.state = {
      user: UserStore.getUser().name,
      newUser: null,
      edit: false
    };
  }

  render() {
    return (
      <div className="app-login">
        {
          this.state.edit ?
            <form className="user-form" onSubmit={this.submitUser}>
              <input className="user-input" placeholder="UserName" value={this.state.newUser} onChange={this.updateUserName} />
            </form>
            : <span>{this.state.user}</span>
        }
        <a href="#" onClick={() => this.showForm()}>
          <i className={this.state.edit ? 'fa fa-close' :  'fa fa-pencil'} />
        </a>
      </div>
    );
  }

  showForm() {
    this.setState({
      edit: !this.state.edit
    });
  }

  updateUserName(event) {
    this.setState({ newUser: event.target.value });
  }

  submitUser(event) {
    event.preventDefault();

    this.setState({
      user: this.state.newUser,
      newUser: null,
      edit: false
    });

    changeUser({ name: this.state.newUser });
  }
};
