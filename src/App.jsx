import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Anonymous"
      },
      messages: []
    };
  }

  handleUserName = (name) => {
    this.setUserName(name);
    this.sendUserNameMsg(this.state.currentUser.name, name);
  }

  handleMsg = (msg) => {
    this.sendMsgMsg(msg);
  }

  handleUserNameAndMsg = (name, msg) => {
    this.sendUserNameMsg(this.state.currentUser.name, name);
    this.setUserName(name, msg);
  }

  setUserName = (name, msg) => {
    this.setState({
      currentUser: {
        name: name,
      }
    }, () => {
      if (msg) {
        this.sendMsgMsg(msg);
      }
    });
  }

  sendUserNameMsg = (currentName, newName) => {
    this.socket.send(JSON.stringify({
      type: "incomingNotification",
      content: `${currentName} changed their name to ${newName}`
    }));
  }

  sendMsgMsg = (msg) => {
    this.socket.send(JSON.stringify({
      type: "incomingMessage",
      content: msg,
      username: this.state.currentUser.name
    }));
  }

  handleReceivedMsg = (event) => {
    if (event.data) {
      try {
        const newMsg = JSON.parse(event.data);
        if (newMsg.type === "incomingNotification" || newMsg.type === "incomingMessage") {
          this.setState({messages: this.state.messages.concat(newMsg)});
        }
      } catch (e) {
          console.log("Received Message Is Not Json.");
      }
    }
  }

  render() {

    const chatBar = <ChatBar key="chatbar" username={this.state.currentUser.name}
                             handleUserName={this.handleUserName}
                             handleMsg={this.handleMsg}
                             handleUserNameAndMsg={this.handleUserNameAndMsg} />;
    const messageList = <MessageList messages={this.state.messages} />;

    return (
      <div>
        {messageList}
        {chatBar}
      </div>
    );
  }

  componentDidMount() {
    const socket = new WebSocket('ws://localhost:3001');
    this.socket = socket;

    socket.addEventListener('open', function (event) {
    });

    socket.addEventListener('message', this.handleReceivedMsg);
  }
}
export default App;