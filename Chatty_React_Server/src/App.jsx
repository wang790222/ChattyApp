import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { generateRandomId } from "./utils";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        userId: generateRandomId(),
        name: "Anonymous",
        color: null
      },
      messages: [],
      onlineUsers: null
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
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        name: name
      }
    }), () => {
      if (msg) {
        this.sendMsgMsg(msg);
      }
    });
  }

  sendUserNameMsg = (currentName, newName) => {
    this.socket.send(JSON.stringify({
      type: "incomingNotification",
      content: `**${currentName}** changed their name to **${newName}**`
    }));
  }

  sendMsgMsg = (msg) => {
    this.socket.send(JSON.stringify({
      type: "incomingMessage",
      content: msg,
      username: this.state.currentUser.name,
      userId: this.state.currentUser.userId,
      color: this.state.currentUser.color
    }));
  }

  handleReceivedMsg = (event) => {
    if (event.data) {
      try {
        const newMsg = JSON.parse(event.data);
        if (newMsg.type === "incomingNotification" || newMsg.type === "incomingMessage") {
          this.setState({messages: this.state.messages.concat(newMsg)});
        } else if (newMsg.usersNum) {
          this.setState({onlineUsers: newMsg.usersNum});
        } else if (newMsg.color) {
          if (!this.state.currentUser.color) {
            this.setState(prevState => ({
              currentUser: {
                ...prevState.currentUser,
                color: newMsg.color
              }
            }));
          }
        }
      } catch (e) {
        console.log("Received Message Is Not Json.");
      }
    }
  }

  render() {
    const sOrNot      = this.state.onlineUsers > 1 ? "Users" : "User";
    const navbar      = <nav className="navbar">
                          <a href="/" className="navbar-brand">Chatty</a>
                          <p className="navbarText">{this.state.onlineUsers} {sOrNot} Online</p>
                        </nav>;
    const chatBar     = <ChatBar key="chatbar" username={this.state.currentUser.name}
                             handleUserName={this.handleUserName}
                             handleMsg={this.handleMsg}
                             handleUserNameAndMsg={this.handleUserNameAndMsg} />;
    const messageList = <MessageList messages={this.state.messages} thisUserId={this.state.currentUser.userId}/>;

    return (
      <div>
        {navbar}
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