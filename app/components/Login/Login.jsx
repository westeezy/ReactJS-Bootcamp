import React from 'react';
import './_Login.scss';

export default class Login extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (<div className="app-login">
            {
              this.props.user ?
                <div>{this.props.user}</div>
              :
                <i className="fa fa-user"></i>
            }
            </div>);
  }
}

Login.propTypes = {
  user: React.PropTypes.string
}
