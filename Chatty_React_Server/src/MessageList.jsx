import React from 'react';
import App from './App.jsx';
import Message from './Message.jsx'
import { generateRandomId } from "./utils";

export default class MessageList extends React.Component {

  constructor(props) {
    super(props);
  }

  messageUserName(name, style) {
    return (<span className="message-username" style={style}>{name}</span>);
  }

  messageContent(content) {
    return (/.\.(jpg|png|gif)/.test(content)) ?
      (<span className="message-content"><img src={content} /></span>) :
      (<span className="message-content">{content}</span>);
  }

  render() {

    const messageList = this.props.messages.map(message => {

      const style = {
        color: message.color
      };

      return (message.type === "incomingNotification") ?
      (
        <messageSystem className="message system" key={generateRandomId()}>
          {message.content}
        </messageSystem>
      ) :
      (
        <message className="message" key={generateRandomId()}>
          {this.messageUserName(message.username, style)}
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
