import React from 'react';
import App from './App.jsx';
import Message from './Message.jsx'
import { generateRandomId } from "./utils";

export default class MessageList extends React.Component {

  constructor(props) {
    super(props);
  }

  messageUserName(name) {
    //<span className="message-username">Anonymous1</span>
    return (<span className="message-username">{name}</span>);
  }

  messageContent(content) {
    //<span className="message-content">I won't be impressed with technology until I can download food.</span>
    return (<span className="message-content">{content}</span>);
  }

  render() {

    const messageList = this.props.messages.map(message => {
      return (message.type === "incomingNotification") ?
      (
        <messageSystem className="message system" key={generateRandomId()}>
          {message.content}
        </messageSystem>
      ) :
      (
        <message className="message" key={generateRandomId()}>
          {this.messageUserName(message.username)}
          {this.messageContent(message.content)}
        </message>
      );

    });

    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
