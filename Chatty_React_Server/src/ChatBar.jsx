import React from 'react';
import MyEmojiPicker from './MyEmojiPicker.jsx';
import JSEMOJI from 'emoji-js';

let jsemoji = new JSEMOJI();

export default class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tempUserName: this.props.username,
      showDefultValue: (this.tempUserName === "Anonymous") ? null : this.tempUserName,
      shorEmojiPicker: false,
      tempMsg: ""
    };
  }

  changeUserName = evt => {
    this.setState({
      tempUserName: evt.target.value
    });
  };

  sendUserName = evt => {
    if (evt.key === "Enter") {
      this.state.tempUserName = this.validateUserName(evt, this.state.tempUserName);
      if (this.state.tempUserName !== this.props.username) {
        this.props.handleUserName(this.state.tempUserName);
      }
    }
  };

  changeMessage = evt => {
    this.setState({
      tempMsg: evt.target.value
    });
  };

  sendMessage = evt => {
    if (evt.key === "Enter") {
      this.state.tempUserName = this.validateUserName(evt, this.state.tempUserName);
      if (this.state.tempUserName !== this.props.username) {
        this.props.handleUserNameAndMsg(this.state.tempUserName, this.state.tempMsg);
      } else {
        this.props.handleMsg(this.state.tempMsg);
      }
      evt.target.value = "";
      this.setState({
        tempMsg: ""
      });
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
    if ((this.state.tempUserName.trim().length === 0)) {
      evt.target.value = "";
    }
  }

  toggleEmojiPicker = (evt) => {
    this.setState({
      shorEmojiPicker: !this.state.shorEmojiPicker
    });
  }

  handleEmoji = (code, emoji) => {
    this.setState({
      tempMsg: this.state.tempMsg + jsemoji.replace_colons(`:${emoji.name}:`)
    });
  }

  render() {

    const emojPic = (this.state.shorEmojiPicker) ? (<MyEmojiPicker className="emoji-picker" handleEmoji={this.handleEmoji}/>) : null;

    return (
      <div>
        {emojPic}
        <footer className="chatbar" key={this.showDefultValue}>
          <input className="chatbar-username" name="username" defaultValue={this.showDefultValue}
                 placeholder="Your Name (Optional)" onChange={this.changeUserName}
                 onKeyPress={this.sendUserName} onBlur={this.avoidUserNameBlank} />
          <input className="chatbar-message" name="msg" placeholder="Type a message and hit ENTER"
                 onChange={this.changeMessage} value={this.state.tempMsg}
                 onKeyPress={this.sendMessage} />
          <span id="emoij-triger" onClick={this.toggleEmojiPicker}>😀</span>
        </footer>
      </div>
    );
  }
}