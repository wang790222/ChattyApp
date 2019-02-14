import React from 'react';
import Swal from 'sweetalert2'

export default class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.tempUserName = this.props.username;
  }

  changeUserName = evt => {
    this.tempUserName = evt.target.value;
  };

  sendUserName = evt => {
    if (evt.key === "Enter") {
      if (this.validateUserName(this.tempUserName)) {
        if (this.tempUserName !== this.props.username) {
          this.props.handleUserName(this.tempUserName);
        }
      }
    }
  };

  sendMessage = evt => {
    if (evt.key === "Enter") {
      if (this.validateUserName(this.tempUserName)) {
        if (this.tempUserName !== this.props.username) {
          this.props.handleUserNameAndMsg(this.tempUserName,evt.target.value);
        } else {
          this.props.handleMsg(evt.target.value);
        }
        evt.target.value = "";
      }
    }
  };

  validateUserName = (name) => {
    if (name.trim().length === 0) {
      Swal.fire("You Should Have A Name.");
      return false;
    }

    return true;
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="username" defaultValue={this.props.username}
               onChange={this.changeUserName} onKeyPress={this.sendUserName} />
        <input className="chatbar-message" name="msg" placeholder="Type a message and hit ENTER"
               onKeyPress={this.sendMessage} />
      </footer>
    );
  }
}