import React from 'react';

export default class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.tempUserName = this.props.username;
    this.showDefultValue = (this.tempUserName === "Anonymous") ? null : this.tempUserName;
  }

  changeUserName = evt => {
    this.tempUserName = evt.target.value;
  };

  sendUserName = evt => {
    if (evt.key === "Enter") {
      this.tempUserName = this.validateUserName(evt, this.tempUserName);
      if (this.tempUserName !== this.props.username) {
        this.props.handleUserName(this.tempUserName);
      }
    }
  };

  sendMessage = evt => {
    if (evt.key === "Enter") {
      this.tempUserName = this.validateUserName(evt, this.tempUserName);
      if (this.tempUserName !== this.props.username) {
        this.props.handleUserNameAndMsg(this.tempUserName,evt.target.value);
      } else {
        this.props.handleMsg(evt.target.value);
      }
      evt.target.value = "";
    }
  };

  validateUserName = (evt, name) => {
    if (name) {
      if ((name.trim().length === 0)) {
        evt.target.value = "";
        return "Anonymous";
      } else {
        return name;
      }
    } else {
      return "Anonymous";
    }
  }

  avoidUserNameBlank = (evt) => {
    if ((this.tempUserName.trim().length === 0)) {
      evt.target.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar" key={this.showDefultValue}>
        <input className="chatbar-username" name="username" defaultValue={this.showDefultValue}
               placeholder="Your Name (Optional)" onChange={this.changeUserName}
               onKeyPress={this.sendUserName} onBlur={this.avoidUserNameBlank} />
        <input className="chatbar-message" name="msg" placeholder="Type a message and hit ENTER"
               onKeyPress={this.sendMessage} />
      </footer>
    );
  }
}