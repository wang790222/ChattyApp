import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

function navBar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  );
}

class App extends Component {
  render() {
    return (
      <body>
        {navBar()}
        <Message />
        <ChatBar />
      </body>
    );
  }
}
export default App;