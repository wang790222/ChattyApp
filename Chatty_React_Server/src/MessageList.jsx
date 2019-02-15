import React from 'react';
import App from './App.jsx';
import { generateRandomId } from "./utils";

export default class MessageList extends React.Component {

  constructor(props) {
    super(props);
  }

  replyMessage = () => {
    console.log(this.props);
  }

  messageUserName(name, style) {
    return (<span className="message-username" style={style}>{name}</span>);
  }

  messageContent(content) {
    return (<span className="message-content" onClick={this.replyMessage}
                  dangerouslySetInnerHTML={{ __html: content }} />);
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
        (this.props.thisUserId === message.userId) ?
          (<message className="message mine" key={generateRandomId()}>
            <div>
              <span className="message-username" style={style}>{message.username}</span>
              <span className="message-content" onClick={this.replyMessage}
                  dangerouslySetInnerHTML={{ __html: message.content }} />
            </div>
           </message>) :
          (<message className="message" key={generateRandomId()}>
            {this.messageUserName(message.username, style)}
            {this.messageContent(message.content)}
           </message>)
      );
    });

    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
