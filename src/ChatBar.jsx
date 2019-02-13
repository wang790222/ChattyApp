import React from 'react';

export default class ChatBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const changeUserName = evt => {
      if (evt.key === "Enter") {
        this.props.handleUserName(evt.target.value);
      }
    };

    const sendMessage = evt => {
      if (evt.key === "Enter") {
        this.props.handleMsg(evt.target.value);
        evt.target.value = "";
      }
    };

    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="username" defaultValue={this.props.username} onKeyPress={changeUserName} />
        <input className="chatbar-message" name="msg" placeholder="Type a message and hit ENTER" onKeyPress={sendMessage} />
      </footer>
    );
  }
}