import React from 'react';
import App from './App.jsx';
import { generateRandomId } from "./utils";

export default class MessageList extends React.Component {

  constructor(props) {
    super(props);
  }

  messageUserName(name, style) {
    return (<span className="message-username" style={style}>{name}</span>);
  }

  messageContent(content) {
    return (<span className="message-content" dangerouslySetInnerHTML={{ __html: content }} />);
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
