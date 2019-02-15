import React from 'react';

export default class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  messageUserName(name, style) {
    console.log("color:", style.color);
    //return ();
  }

  // messageContent(content) {
  //   return (<span className="message-content" dangerouslySetInnerHTML={{ __html: content }} />);
  // }

  render() {

    const style = {
      color: this.props.message.color
    };

    console.log("message:", this.props.message);

    return (<div>123</div>);
  }
}
