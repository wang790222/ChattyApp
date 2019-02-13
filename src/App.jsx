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
    if (name !== this.state.currentUser.name) {
      this.setState(
      {
        currentUser: {
          name: name,
        },

        messages: this.newAndConcatMsg("incomingNotification", "", name)
      });
    }
  }

  handleMsg = (msg) => {

    this.setState({messages: this.newAndConcatMsg("incomingMessage", msg, "")});
    this.socket.send(JSON.stringify({
      username: this.state.currentUser.name,
      message: msg
    }));
  }

  newAndConcatMsg = (type, content, name) => {
    return this.state.messages.concat((type === "incomingNotification") ?
      (
        {
          type: "incomingNotification",
          content: `${this.state.currentUser.name} changed their name to ${name}`
        }
      ) :
      (
        {
          type: "incomingMessage",
          content: content,
          username: this.state.currentUser.name
        }
    ));
  }

  render() {

    const chatBar = <ChatBar key="chatbar" username={this.state.currentUser.name} handleUserName={this.handleUserName} handleMsg={this.handleMsg} />;
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

    socket.addEventListener('message', function (event) {
      console.log("Data from server", event.data);
    });
  }
}
export default App;